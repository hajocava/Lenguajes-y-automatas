import React, { useState, useRef } from 'react'
import regParser from 'automata.js'
import Viz from 'viz.js';
import DOMPurify from 'dompurify';
import Loading from '../components/Loading'


export default function RegExpresions() {

    const textInput = useRef(null);

    const [error, seterror] = useState({
        visible: false,
        message: ''
    });

    const [automataNFA, setAutomataNFA] = useState(null)
    const [automataDFA, setAutomataDFA] = useState(null)

    const [state, setState] = useState({ clear: true, loading: false })


    function dibujarAutomata() {
        const regExpText = textInput.current.value

        if (regExpText.length > 0) {
            setState({ loading: true })
            setTimeout(() => {
                const parser1 = new regParser.RegParser(textInput.current.value)
                const parser2 = new regParser.RegParser(textInput.current.value)

                const nfa = parser1.parseToNFA();
                const dfa = parser2.parseToDFA();

                const graphNFA = Viz(nfa.toDotScript(), { format: "svg", engine: 'dot', autoResize: true});
                const graphDFA = Viz(dfa.toDotScript(), { format: "svg", engine: 'dot', autoResize: true});

                setAutomataNFA(graphNFA)
                setAutomataDFA(graphDFA)

                setState({ loading: false })
            }, 1500);

        } else {
            setState({ clear: true, loading: false })

            seterror({
                visible: true,
                message: 'Ingresa una expresion regular valida.'
            })

            setTimeout(() => seterror({
                visible: false,
                message: ''
            }), 3000);
        }
    }

    function clean() {
        textInput.current.value = ''
        setState({ loading: false, clear: true })
    }


    function toShow() {
        if (state.loading) return <Loading />
        else if (state.clear) return <p className="m-0">Ingresa una expresion regular para comenzar.</p>
        else return <div>
            <h5>Determinista</h5>
            <div className="d-flex justify-content-center align-items-center" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(automataDFA) }} />
            <h5>No determinista</h5>
            <div className="d-flex justify-content-center align-items-center" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(automataNFA) }} />
        </div>
    }


    return (
        <div id="exp-reg" data-spy="scroll">
            <h2 className="mt-4 mb-4">Automatas</h2>
            <div className="form-group">
                <label htmlFor="regExp">Expresion regular</label>
                <input
                    onKeyPress={e => { e.key === 'Enter' && dibujarAutomata() }}
                    ref={textInput}
                    type="text"
                    className="form-control"
                    id="regExp"
                    placeholder="Ejemplo: (ab)*"
                />
                {error &&
                    <small style={{ color: 'red' }} id="emailHelp" className="form-text text-danger">
                        {error.message}
                    </small>
                }
            </div>

            <button onClick={dibujarAutomata} type="button" className="btn btn-primary mb-2">Calcular</button>
            <button onClick={clean} type="button" className="btn btn-primary mb-2 ml-3">Limpiar</button>
            <div className="card-container mt-4 pt-5 pb-5">
                {toShow()}
            </div>
        </div>
    )
}
