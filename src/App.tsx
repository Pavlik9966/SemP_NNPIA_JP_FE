import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import React, {useState} from 'react';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Home from './components/Home';
import Navigation from "./components/Navigation";

const App = () => {
    const isLoggedIn = false
    const [token, setToken] = useState('');
    const [showRegistration, setShowRegistration] = useState(false);

    const handleLogin = (username: string, newToken: string) => setToken(newToken);

    const handleHideRegistration = () => setShowRegistration(false);

    return (
        <BrowserRouter>
            <Navigation/>
            <Routes>
                <Route
                    path={"/login"}
                    element={isLoggedIn ?
                        <Navigate to={"/"}/> :
                        <LoginForm onLogin={handleLogin} onShowRegistration={handleHideRegistration}/>}
                />
                <Route
                    path={"/register"}
                    element={isLoggedIn ?
                        <Navigate to={"/"}/> :
                        <RegistrationForm onRegister={handleLogin} onCancel={handleHideRegistration}/>}
                />
                <Route
                    path={"/"}
                    element={isLoggedIn ?
                        <Home/> :
                        <Navigate to={"/login"}/>}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;