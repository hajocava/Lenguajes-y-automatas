import React, { useState, useEffect } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2';
import compiler from '../functions/compilador/compiler'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'


export default function Analizador() {

    const [code, setCode] = useState({
        value: '// Intenta dibujar por codigo!\nPaper 100\nPen 0\nLine 50 77 22 27\nLine 22 27 78 27\nLine 78 27 50 77'
    })

    const [tokens, setTokens] = useState({
        value: ''
    })

    const [sbnast, setSbnast] = useState({
        value: ''
    })
    const [svgast, setSvgast] = useState({
        value: ''
    })
    const [svgtext, setSvgtext] = useState({
        value: ''
    })



    const options = {
        mode: 'xml',
        theme: 'material',
        lineNumbers: true
    }

    function draw(codeValue) {
        let localTokens, localSbnast, localSvgast, localSvg;
        try {
            localTokens = compiler.lexer(codeValue)
            setTokens({
                value: JSON.stringify(localTokens, null, 2)
            })

        } catch (error) {
            console.log(error)
            return
        }

        try {
            localSbnast = compiler.parser(localTokens)
            setSbnast({
                ...sbnast,
                value: JSON.stringify(localSbnast, null, 2)
            })

        } catch (e) {
            console.log(e);
            return
        }

        try {
            localSvgast = compiler.transformer(localSbnast)
            setSvgast({
                ...svgast,
                value: JSON.stringify(localSvgast, null, 2)
            })
        } catch (e) {
            console.log(e);
            return
        }

        try {
            localSvg = compiler.generator(localSvgast)
            setSvgtext({
                ...svgtext,
                value: localSvg
            })

        } catch (e) {
            console.log(e);
            return
        }
    }

    useEffect(() => {
        draw(code.value)
    }, []);

    return (
        <div id="analizador" data-spy="scroll">
            <h2 className="mt-4">Analizador sintactico y semantico</h2>
            <div className="row mt-4">
                <div className="col-12 col-md-8 col-lg-9">
                    <CodeMirror
                        value={code.value}
                        options={options}
                        onBeforeChange={(editor, data, value) => setCode({value})}
                        onChange={(editor, data, value) => draw(value)}
                    />
                </div>
                <div className="col-12 col-md-4 col-lg-3 mt-3 mt-md-0">
                    <div className="card-container">
                        <h5>SVG</h5>
                        <div dangerouslySetInnerHTML={{ __html: svgtext.value }} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-4 mt-4">
                    <div className="card-container">
                        <h5>Tokens</h5>
                        <CodeMirror
                            value={tokens.value}
                            options={{ lineNumbers: true, readOnly: true }}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 mt-4">
                    <div className="card-container">
                        <h5>Árbol de sintaxis</h5>
                        <CodeMirror
                            value={sbnast.value}
                            options={{ lineNumbers: true, readOnly: true }}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 mt-4">
                    <div className="card-container">
                        <h5>Transformación</h5>
                        <CodeMirror
                            value={svgast.value}
                            options={{ lineNumbers: true, readOnly: true }}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-12 mt-4">
                    <div className="card-container">
                        <h5>Codigo generado</h5>
                        <CodeMirror
                            value={svgtext.value}
                            options={{ lineNumbers: true, readOnly: true }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
