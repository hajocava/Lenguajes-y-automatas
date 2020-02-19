import React from 'react'
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

function initDiagram() {
    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, {
        initialAutoScale: go.Diagram.UniformToFill,
        layout: $(go.TreeLayout)
    });

    // define a simple Node template
    diagram.nodeTemplate = $(go.Node, "Spot",
        { locationSpot: go.Spot.Center },
        new go.Binding("text", "text"),  // for sorting
        $(go.Shape, "Ellipse",
            {
                fill: "lightgray",  // the initial value, but data binding may provide different value
                stroke: null,
                desiredSize: new go.Size(40, 40),
            },
            new go.Binding("desiredSize", "size"),
            new go.Binding("fill", "fill")),
        $(go.TextBlock, new go.Binding("text", "text"))
    );

    diagram.layout.angle = 90;

    return diagram;
}


export default function Arbol({ nodeDataArray, linkDataArray }) {
    return (
        <div style={{ minHeight: nodeDataArray.length === 0 ? '150px' : '250px' }} className="d-flex justify-content-center align-items-center">
            <ReactDiagram
                initDiagram={initDiagram}
                divClassName='diagram-component'
                nodeDataArray={nodeDataArray}
                linkDataArray={linkDataArray}
            />
        </div>
    )
}
