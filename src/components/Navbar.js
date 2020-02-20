import React, { useEffect } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { animeIn } from '../animations/Navbar';

export default function NavbarNav() {

    useEffect(() => animeIn(), []);

    return (
        <Navbar id="navbar" className="shadow-custom" fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Proyecto</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#arboles">Arboles</Nav.Link>
                    <Nav.Link href="#exp-reg">Automatas</Nav.Link>
                    <Nav.Link href="#analizador">Analizador</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
