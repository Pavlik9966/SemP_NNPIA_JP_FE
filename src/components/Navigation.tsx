import {Button, Container, Nav, Navbar} from "react-bootstrap";
import React from "react";
import {useLocation} from "react-router";
import {Link, useNavigate} from "react-router-dom";

interface NavigationProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({setIsAuthenticated}) => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isRegistrationPage = location.pathname === '/register';
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('expiration');
        localStorage.removeItem("token");
        localStorage.removeItem('user');

        setIsAuthenticated(false);

        navigate("/login");
    };

    if (isLoginPage || isRegistrationPage) {
        return null;
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">I-Banking</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Link 1</Nav.Link>
                        {/*<Nav.Link as={Link} to="/">Link 2</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action 1</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Action 2</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Action 3</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Action 4</NavDropdown.Item>
                        </NavDropdown>*/}
                    </Nav>
                    <Nav>
                        <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
                        {/*<Nav.Link href="#deets">Logout</Nav.Link>*/}
                        {/*<Nav.Link eventKey={2} href="#memes">Dank memes</Nav.Link>*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;