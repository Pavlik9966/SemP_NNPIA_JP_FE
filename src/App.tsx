import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Navigation from "./components/Navigation";
import {User} from "./data/api/types";
import Transactions from "./pages/transactions/Transactions";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const expiration = localStorage.getItem('expiration');
        const token = localStorage.getItem('token');

        setUser(JSON.parse(localStorage.getItem('user')!!));

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
        <BrowserRouter>
            <Navigation setIsAuthenticated={setIsAuthenticated}/>
            <Routes>
                <Route
                    path={"/"}
                    element={isAuthenticated ?
                        (user && (<Home user={user}/>)) :
                        (<Navigate to="/login" replace/>)}
                />
                <Route
                    path={"/login"}
                    element={isAuthenticated ?
                        (<Navigate to="/" replace/>) :
                        (<Login setIsAuthenticated={setIsAuthenticated}/>)}
                />
                <Route path={"/transactions/*"}>
                    <Route
                        path=":selected"
                        element={isAuthenticated ?
                            (<Transactions/>) :
                            (<Navigate to="/login" replace/>)}
                    />
                </Route>
                {/*<Route
                        path={"/register"}
                        element={isAuthenticated ?
                            (<Navigate to="/" replace/>) :
                            (<Registration/>)}
                    />*/}
                <Route
                    path={"*"}
                    element={<Navigate to="/" replace/>}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;