import axios from 'axios';
import {Button, Container, Form, Spinner} from 'react-bootstrap';
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {User} from "../../data/api/types";

interface LoginFormProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginFormProps> = ({setIsAuthenticated}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const API_URL = import.meta.env.BASE_URL;

            const response = await axios.post(`http://localhost:9000/api/v1/auth/login`, {
                username: username,
                password: password,
            });

            const token = response.data.token;
            localStorage.setItem('expiration', (new Date().getTime() + 10 * 60 * 1000).toString());
            localStorage.setItem('token', token);

            setIsAuthenticated(true);
        } catch (error: any) {
            console.error('Error logging in: ', error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }

        try {
            const API_URL = import.meta.env.BASE_URL;
            const token = localStorage.getItem('token');

            const response = await axios.get(`${API_URL}/user`, {
                headers: {'Authorization': `Bearer ${token}`},
                params: {username: username},
            });

            const user: User = response.data;
            localStorage.setItem('user', JSON.stringify(user));

            navigate('/');
        } catch (error: any) {
            console.error('Error fetching user: ', error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center">
            <div className="card mt-5" style={{width: '50%'}}>
                <div className="card-header">
                    <h3 className="card-title">Login</h3>
                </div>
                <div className="card-body">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label className="ms-2">Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label className="ms-2">Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="primary" type="submit" className="" style={{width: '25%'}}
                                    disabled={isLoading}>
                                {isLoading ? <Spinner animation="border" size="sm"/> : 'Log In'}
                            </Button>
                        </div>
                        {/*<div className="mt-2 text-center">
                            Don't have an account?{' -> '}
                            <Button className="text-nowrap" variant="warning" style={{
                                width: '25%', textOverflow: 'ellipsis', overflow: 'hidden'
                            }} onClick={onShowRegistration}>Register here</Button>
                        </div>*/}
                        {error && <div className="alert alert-danger">{error}</div>}
                    </Form>
                </div>
            </div>
        </Container>
    );
};

export default Login;