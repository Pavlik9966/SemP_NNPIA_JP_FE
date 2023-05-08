import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Navigation from "./components/Navigation";
import {Provider} from "react-redux";
import {store} from "./features/store";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const expiration = localStorage.getItem('expiration');
        const token = localStorage.getItem('token');

        if (token && expiration) {
            const currentTime = new Date().getTime();
            const expirationTime = parseInt(expiration);

            if (currentTime < expirationTime) {
                setIsAuthenticated(true);

                setTimeout(() => {
                    setIsAuthenticated(false);

                    localStorage.removeItem('expiration');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }, expirationTime - currentTime);
            } else {
                localStorage.removeItem('expiration');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navigation setIsAuthenticated={setIsAuthenticated}/>
                <Routes>
                    <Route
                        path={"/"}
                        element={isAuthenticated ?
                            (<Home user={JSON.parse(localStorage.getItem('user')!!)}/>) :
                            (<Navigate to="/login" replace/>)}
                    />
                    <Route
                        path={"/login"}
                        element={isAuthenticated ? (<Navigate to="/" replace/>) : (
                            <Login setIsAuthenticated={setIsAuthenticated}/>)}
                    />
                    <Route
                        path={"*"}
                        element={<Navigate to="/" replace/>}
                    />
                    {/*<Route
                        path={"/register"}
                        element={<Registration/>}
                    />*/}
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;