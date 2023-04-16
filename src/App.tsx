import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, {useState} from 'react';
import {Button, Container} from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Home from './components/Home';

const App = () => {
    const [token, setToken] = useState('');
    const [showRegistration, setShowRegistration] = useState(false);

    const handleLogin = (username: string, newToken: string) => setToken(newToken);

    const handleLogout = () => setToken('');

    const handleShowRegistration = () => setShowRegistration(true);

    const handleHideRegistration = () => setShowRegistration(false);

    return (
        <Router>
            <Container className="d-flex justify-content-center">
                {token ? (
                    <div>
                        <p>You are logged in!</p>
                        <Button variant="primary" onClick={handleLogout}>Logout</Button>
                    </div>
                ) : showRegistration ? (
                    <RegistrationForm onRegister={handleLogin} onCancel={handleHideRegistration}/>
                ) : (
                    <LoginForm onLogin={handleLogin} onShowRegistration={handleShowRegistration}/>
                )}
                {/*<Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>*/}
            </Container>
        </Router>
    );
};

export default App;