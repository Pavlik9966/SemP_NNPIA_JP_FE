import React, {useState} from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import axios from 'axios';

interface LoginFormProps {
    onLogin: (username: string, token: string) => void;
    onShowRegistration: () => void;
}

const Login: React.FC<LoginFormProps> = ({onLogin, onShowRegistration}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.post('/api/v1/auth/login', {username, password});
            onLogin(username, response.data.token);
        } catch (error: any) {
            setError(error.message);
        }
        setIsLoading(false);
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
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="text-center">
                            <Button variant="primary" type="submit" className="" style={{width: '25%'}}
                                    disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</Button>
                        </div>
                        <div className="mt-2 text-center">
                            Don't have an account?{' -> '}
                            <Button className="text-nowrap" variant="warning" style={{
                                width: '25%', textOverflow: 'ellipsis', overflow: 'hidden'
                            }} onClick={onShowRegistration}>Register here</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </Container>
    );
};

export default Login;