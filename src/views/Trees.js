import React, { Fragment, useState, useRef } from 'react'
import Node from '../functions/trees/Node'
import Arbol from '../components/Arbol'
import Recorridos from '../components/Recorridos'
import BinaryTree from '../functions/trees/BinaryTree'
import { sufija } from '../functions/trees/Notation'
import Loading from '../components/Loading'
import { esOperador, esVariable } from '../functions/trees/Notation'


export default function Trees() {
    const textInput = useRef(null);

    const [nodeDataArray, setNodeDataArray] = useState([])
    const [linkDataArray, setlinkDataArray] = useState([])

    const [state, setState] = useState({ clear: true, loading: false })

    const [notaciones, setNotaciones] = useState({
        inorden: '',
        preorden: '',
        postorden: '',
        peso: ''
    })

    const [error, seterror] = useState({
        visible: false,
        message: ''
    });

    function linkData(tree, array = [], linkDataNodes = [], preorden = []) {

        if (typeof (tree) !== 'undefined') {
            if (tree.left || tree.right) {

                preorden.push(tree.data.text)

                if (!(tree.left instanceof Node) && tree.length !== 0) {
                    linkDataNodes.push({
                        key: tree.data.key,
                        from: tree.data.key,
                        to: tree.left.key
                    })

                    preorden.push(tree.left.text)

                } else {
                    linkDataNodes.push({
                        key: tree.data.key,
                        from: tree.data.key,
                        to: tree.left.data.key
                    })

                }

                if (!(tree.right instanceof Node) && tree.length !== 0) {
                    linkDataNodes.push({
                        key: tree.data.key,
                        from: tree.data.key,
                        to: tree.right.key
                    })

                    preorden.push(tree.right.text)

                } else {
                    linkDataNodes.push({
                        key: tree.data.key,
                        from: tree.data.key,
                        to: tree.right.data.key
                    })

                }

                array.push(tree.data)
            }

            else array.push(tree)

            linkData(tree.left, array, linkDataNodes, preorden)
            linkData(tree.right, array, linkDataNodes, preorden)
        }

        return [array, linkDataNodes, preorden]
    }

    async function calculate() {
        setNodeDataArray([])
        setlinkDataArray([])
        let flagError = false
        const infijo = textInput.current.value

        for (let i = 0; i < infijo.length; i++)
            if (!(esOperador(infijo[i]) || esVariable(infijo[i]))) flagError = true

        if (infijo.length > 1 && !flagError) {
            setState({ loading: true })
            setTimeout(() => {
                const BT = new BinaryTree()
                const notacionSufija = sufija(infijo) // convierte una notacion infija a sufija

                const tree = BT.createTree(notacionSufija) // crea un arbol a partir de una notacion sufija (postfija)

                const [nodes, linksNodes, preorden] = linkData(tree)

                setNotaciones({
                    inorden: infijo,
                    postorden: notacionSufija,
                    peso: nodes.length,
                    preorden
                })

                setNodeDataArray(nodes)
                setlinkDataArray(linksNodes)

                setState({ loading: false, clear: false })
            }, 1500);

        } else {
            setState({ clear: true, loading: false })

            seterror({
                visible: true,
                message: 'La expresión debe ser ingresada en notacion infija.'
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
        setNodeDataArray([])
        setlinkDataArray([])
    }

    function toShow() {
        if (state.loading) return (
            <div style={{ height: '150px' }} className="card-container d-flex align-items-center jusitfy-content-center">
                <Loading />
            </div>
        )

        else if (state.clear) return (
            <div className="card-container pt-5 pb-5 d-flex justify-content-center align-items-center">
                <p className="m-0">Ingresa una expresión para comenzar.</p>
            </div>
        )

        else return (
            <div className="card-container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h5 className="mb-4">Recorridos</h5>
                        <Recorridos notaciones={notaciones} />
                    </div>
                    <div className="col-12 col-md-6">
                        <h5 className="mb-4">Arbol binario</h5>
                        <Arbol
                            nodeDataArray={nodeDataArray}
                            linkDataArray={linkDataArray}
                        />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Fragment>
            <h2 className="mb-4">Arboles de expresiones</h2>
            <div className="form-group">
                <label htmlFor="expresion">Expresión infija</label>
                <input
                    onKeyPress={e => { e.key === 'Enter' && calculate() }}
                    ref={textInput}
                    type="text"
                    className="form-control"
                    id="expresion"
                    placeholder="Ejemplo (A + B) * (C / D)"
                />
                {error &&
                    <small style={{ color: 'red' }} id="emailHelp" className="form-text text-danger">
                        {error.message}
                    </small>
                }
            </div>
            <button onClick={calculate} type="button" className="btn btn-primary mb-2">Calcular</button>
            <button onClick={clean} type="button" className="btn btn-primary mb-2 ml-3">Limpiar</button>
            <div className="row">
                <div className="col-12 mt-4">
                    {toShow()}
                </div>
            </div>
        </Fragment>
    )
}
