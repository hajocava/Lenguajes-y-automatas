import React, { Fragment, useState, useRef } from 'react'
import Node from '../functions/Node'
import Arbol from '../components/Arbol'
import Recorridos from '../components/Recorridos'
import BinaryTree from '../functions/BinaryTree'
import Toast from '../components/Toast'
import { sufija } from '../functions/Notation'
import Loading from '../components/Loading'

export default function Trees() {
    const textInput = useRef(null);

    const [nodeDataArray, setNodeDataArray] = useState([])
    const [linkDataArray, setlinkDataArray] = useState([])

    const [state, setState] = useState({ clear: true, loading: false })

    const [notaciones, setNotaciones] = useState({
        inorden: '',
        preorden: '',
        postorden: '',
        niveles: '',
        peso: '',
        altura: ''
    })

    const [error, seterror] = useState(false);
    const toggleerror = () => seterror(!error);

    function linkData(tree, array = [], linkDataNodes = []) {
        if (typeof (tree) !== 'undefined') {
            if (tree.left || tree.right) {
                if (!(tree.left instanceof Node) && tree.length !== 0) {
                    linkDataNodes.push({
                        key: tree.data.key,
                        from: tree.data.key,
                        to: tree.left.key
                    })
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

            linkData(tree.left, array, linkDataNodes)
            linkData(tree.right, array, linkDataNodes)
        }

        return [array, linkDataNodes]
    }

    async function calculate() {
        setNodeDataArray([])
        setlinkDataArray([])
        const infijo = textInput.current.value

        if (infijo.length > 1) {
            setState({ loading: true })
            setTimeout(() => {
                const BT = new BinaryTree()
                const notacionSufija = sufija(infijo) // convierte una notacion infija a sufija

                const tree = BT.createTree(notacionSufija) // crea un arbol a partir de una notacion sufija (postfija)

                const [nodes, linksNodes] = linkData(tree)

                setNotaciones({
                    inorden: infijo,
                    postorden: notacionSufija,
                    peso: nodes.length
                })
                setNodeDataArray(nodes)
                setlinkDataArray(linksNodes)

                setState({ loading: false, clear: false })
            }, 1500);

        } else {
            toggleerror()
            setTimeout(() => seterror(false), 3000);
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
            <div style={{ height: '150px' }} className="card-container d-flex justify-content-center align-items-center">
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
                    <small style={{color: 'red'}} id="emailHelp" className="form-text text-danger">
                        La expresión debe ser ingresada en notacion infija.
                    </small>
                }
            </div>
            <button onClick={calculate} type="button" className="btn btn-primary mb-2">Calcular</button>
            <button onClick={clean} type="button" className="btn btn-primary mb-2 ml-3">Limpiar</button>
            <div className="row">
                <div className="col-12 mt-4">
                    <h5 className="mb-3">Árbol de expresón</h5>
                    {toShow()}
                </div>
            </div>
        </Fragment>
    )
}
