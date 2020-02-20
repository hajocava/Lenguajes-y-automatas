import React, { useState } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'


export default function Analizador() {
    const [state, setState] = useState({
        value: '// Intenta dibujar por codigo!\nPaper 100\nPen 0\nLine 50 77 22 27\nLine 22 27 78 27\nLine 78 27 50 77'
    })

    const options = {
        mode: 'xml',
        theme: 'material',
        lineNumbers: true
    }

    return (
        <div id="analizador" data-spy="scroll">
            <h2 className="mt-4">Analizador sintactico y semantico</h2>
            <div className="row">
                <div className="col-12 col-lg-7 mt-4">
                    <CodeMirror
                        value={state.value}
                        options={options}
                        onBeforeChange={(editor, data, value) => {
                            setState({ value });
                        }}
                        onChange={(editor, data, value) => {
                            console.log(value)
                        }}
                    />
                </div>
                <div className="col-12 col-lg-5 mt-4">
                    <div style={{ height: '300px' }} className="card-container">
                        <h5>SVG</h5>
                        <div id="svg-container"></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-3 mt-4">
                    <div className="card-container">
                        <h5>Tokens</h5>
                        <div id="tokens"></div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3 mt-4">
                    <div className="card-container">
                        <h5>Parsed AST</h5>
                        <div id="sbnast"></div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3 mt-4">
                    <div className="card-container">
                        <h5>Transformed AST</h5>
                        <div id="svgast"></div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3 mt-4">
                    <div className="card-container">
                        <h5>Generated Code</h5>
                        <div id="svgtext"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
