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


export default function Arbol() {
    return (
        <div style={{ minHeight: '200px' }} className="card-container d-flex justify-content-center align-items-center">
            <ReactDiagram
                initDiagram={initDiagram}
                divClassName='diagram-component'
                nodeDataArray={[
                    { key: 0, text: '*' },
                    { key: 1, text: '+' },
                    { key: 2, text: 'a' },
                    { key: 3, text: 'b' },
                    { key: 4, text: '/' },
                    { key: 5, text: 'c' },
                    { key: 6, text: 'd' },
                ]}
                linkDataArray={[
                    { key: -1, from: 0, to: 1 },
                    { key: -2, from: 0, to: 4 },
                    { key: -2, from: 1, to: 2 },
                    { key: -2, from: 1, to: 3 },
                    { key: -2, from: 4, to: 5 },
                    { key: -2, from: 4, to: 6 },
                ]}
            />
        </div>
    )
}
