import {useLocation} from "react-router";
import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

const Navigation = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isRegistrationPage = location.pathname === '/register';

    if (isLoginPage || isRegistrationPage) {
        return null;
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">I-Banking</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Link 1</Nav.Link>
                        <Nav.Link href="#pricing">Link 2</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action 1</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Action 2</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Action 3</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Action 4</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">Logout</Nav.Link>
                        {/*<Nav.Link eventKey={2} href="#memes">Dank memes</Nav.Link>*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;