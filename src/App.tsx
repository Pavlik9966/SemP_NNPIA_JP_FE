import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import React, {useState} from 'react';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Home from './pages/home/Home';
import Navigation from "./components/Navigation";
import {Provider} from "react-redux";
import {store} from "./features/store";

const App = () => {
    const isLoggedIn = false
    const [token, setToken] = useState('');
    const [showRegistration, setShowRegistration] = useState(false);
    const handleLogin = (username: string, newToken: string) => setToken(newToken);
    const handleHideRegistration = () => setShowRegistration(false);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navigation/>
                <Routes>
                    <Route
                        path={"/login"}
                        element={isLoggedIn ?
                            <Navigate to={"/"}/> :
                            <Login onLogin={handleLogin} onShowRegistration={handleHideRegistration}/>}
                    />
                    <Route
                        path={"/register"}
                        element={isLoggedIn ?
                            <Navigate to={"/"}/> :
                            <Registration onRegister={handleLogin} onCancel={handleHideRegistration}/>}
                    />
                    <Route
                        path={"/"}
                        element={isLoggedIn ?
                            <Home/> :
                            <Navigate to={"/login"}/>}
                    />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;