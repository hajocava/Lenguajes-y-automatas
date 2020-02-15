import React from 'react'
import { Link } from 'react-scroll';

export default function Nav() {
    return (
        <nav className="navbar navbar-expand fixed-top d-flex justify-content-between shadow-custom">
            <label className="navbar-brand m-0">Proyecto</label>
            <ul className="navbar-nav">
                <li className="nav-item mr-4"><Link className="nav-link" to="services" spy={true} smooth={true} offset={-70} duration={500}>Arboles</Link></li>
                <li className="nav-item mr-4"><Link className="nav-link" to="exp-reg" spy={true} smooth={true} offset={-70} duration={500}>Expresiones</Link></li>
                <li className="nav-item"><Link className="nav-link" to="build-form" spy={true} smooth={true} offset={-70} duration={500}>Analizador</Link></li>
            </ul>
        </nav>
    )
}
