import React, { Fragment } from 'react'

export default function Recorridos({ notaciones }) {
    return (
        <Fragment>
            <p>In-orden: <span className="font-weight-bold">{notaciones.inorden}</span></p>
            <p>Pre-orden: <span className="font-weight-bold">{notaciones.preorden}</span></p>
            <p>Post-orden: <span className="font-weight-bold">{notaciones.postorden}</span></p>

            <hr />

            {/* <p className="mt-3">Altura: <span className="font-weight-bold">{notaciones.altura}</span></p> */}
            <p>Peso: <span className="font-weight-bold">{notaciones.peso}</span></p>
        </Fragment>
    )
}
