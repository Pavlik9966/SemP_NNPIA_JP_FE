import axios from 'axios';
import {Alert, Button, Container, Form, Spinner} from 'react-bootstrap';
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {User} from "../../data/api/types";

interface LoginFormProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginFormProps> = ({setIsAuthenticated}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const API_URL = 'http://localhost:9000/api/v1';
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [show, setShow] = useState(true);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post(`${API_URL}` + "/auth/login", {
                username: username,
                password: password,
            });

            const token = response.data.token;
            localStorage.setItem('expiration', (new Date().getTime() + 10 * 60 * 1000).toString());
            localStorage.setItem('token', token);

            setIsAuthenticated(true);

            try {
                const token = localStorage.getItem('token');

                const response = await axios.get(`${API_URL}` + "/user/find", {
                    headers: {'Authorization': `Bearer ${token}`},
                    params: {username: username},
                });

                const user: User = response.data;
                localStorage.setItem('user', JSON.stringify(user));

                navigate('/');
            } catch (error: any) {
                console.error('Error fetching user: ', error.message);
                setShow(true);
                setError('Error fetching user: ' + `${error.message}`);
            } finally {
                setIsLoading(false);
            }
        } catch (error: any) {
            console.error('Error logging in: ', error.message);
            setShow(true);
            setError('Error logging in: ' + `${error.message}`);
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
                                required
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label className="ms-2">Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
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
                        {error && show &&
                            <Alert variant="danger" className="mb-0 mt-3 pb-0" onClose={() => setShow(false)}
                                   dismissible>
                                <p>{error}</p>
                            </Alert>}
                    </Form>
                </div>
            </div>
        </Container>
    );
};

export default Login;