import React, { Fragment, useState, useRef } from 'react'
import Arbol from '../components/Arbol'
import Recorridos from '../components/Recorridos'
import BinaryTree from '../functions/BinaryTree'
import Toast from '../components/Toast'
import { sufija } from '../functions/Notation'
import Loading from '../components/Loading'

export default function Trees() {
    const textInput = useRef(null);

    const [state, setState] = useState({
        clear: true,
        loading: false
    })

    const [notaciones, setNotaciones] = useState({
        inorden: '',
        preorden: '',
        postorden: '',
        niveles: ''
    })

    const [showToast, setShowToast] = useState(false);
    const toggleShowToast = () => setShowToast(!showToast);

    async function calculate() {
        const infijo = textInput.current.value

        if (infijo.length > 1) {
            setState({ loading: true })
            setTimeout(() => {
                const BT = new BinaryTree()
                const notacionSufija = sufija(infijo) // convierte una notacion infija a sufija

                setNotaciones({
                    inorden: infijo,
                    postorden: notacionSufija
                })

                const tree = BT.createTree(notacionSufija) // crea un arbol a partir de una notacion sufija (postfija)
                console.log(tree);

                setState({ loading: false, clear: false })
            }, 1000);

        } else {
            toggleShowToast()
            setTimeout(() => setShowToast(false), 3000);
        }
    }

    function clean() {
        textInput.current.value = ''
        setState({ loading: false, clear: true })
    }

    function toShow() {
        if (state.loading) return (
            <div style={{ height: '150px' }} className="card-container d-flex align-items-center jusitfy-content-center">
                <Loading />
            </div>
        )

        else if (state.clear) return (
            <div style={{ height: '150px' }} className="card-container d-flex justify-content-center align-items-center">
                <p className="m-0">Ingresa una expresión para comenzar.</p>
            </div>
        )

        else return (
            <Recorridos notaciones={notaciones} />
        )
    }

    return (
        <Fragment>
            <h2 className="mb-4">Arboles de expresiones</h2>
            <div>
                <div className="form-group">
                    <label htmlFor="expresion">Expresión</label>
                    <input
                        onKeyPress={e => {e.key === 'Enter' && calculate()}}
                        ref={textInput}
                        type="text"
                        className="form-control"
                        id="expresion"
                        placeholder="Ejemplo (A + B) * (C / D)"
                    />
                    <small id="emailHelp" className="form-text text-muted">La expresión debe ser ingresada en notacion infija.</small>
                </div>
                <button onClick={calculate} type="button" className="btn btn-primary mb-2">Calcular</button>
                <button onClick={clean} type="button" className="btn btn-primary mb-2 ml-3">Limpiar</button>
                <Toast
                    showToast={showToast}
                    setShowToast={setShowToast}
                    toggleShowToast={toggleShowToast}
                    title='Entrada invalida'
                    body='Ingresa una expresión matematica correcta.'
                />
            </div>
            <div className="row mt-5">
                <div className="col-12 col-md-6">
                    <div className="row">
                        <div className="col-12">
                            <h5 className="mb-3">Recorridos</h5>
                            {toShow()}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 mb-4">
                    <h5 className="mb-3">Árbol de expresón</h5>
                    <Arbol />
                </div>
            </div>
        </Fragment>
    )
}
