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
                    </Nav>
                    <Nav>
                        <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;