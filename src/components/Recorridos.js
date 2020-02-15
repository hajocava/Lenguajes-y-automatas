import React from 'react'

export default function Recorridos({ notaciones }) {
    return (
        <div className="card-container">
            <p className="font-weight-bold">In-orden: <span className="font-weight-normal">{notaciones.inorden}</span></p>
            <p className="font-weight-bold">Pre-orden: <span className="font-weight-normal">{notaciones.preorden}</span></p>
            <p className="font-weight-bold">Post-orden: <span className="font-weight-normal">{notaciones.postorden}</span></p>
            <p className="font-weight-bold">Niveles: <span className="font-weight-normal">{notaciones.niveles}</span></p>

            <hr/>

            <p className="font-weight-bold mt-3">Altura: <span className="font-weight-normal">3</span></p>
            <p className="font-weight-bold">Peso: <span className="font-weight-normal">7</span></p>
        </div>
    )
}
