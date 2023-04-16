import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import axios from "axios";

interface RegistrationFormProps {
    onRegister: (username: string, token: string) => void;
    onCancel: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({onRegister, onCancel,}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.post('/api/v1/auth/register', {
                username,
                password,
                creationDate: new Date().toISOString()
            });
            onRegister(username, response.data.token);
        } catch (error: any) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="card mt-5" style={{width: '50%'}}>
            <div className="card-header">
                <h3 className="card-title">Register</h3>
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
                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label className="ms-2">Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </Form.Group>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="text-center">
                        <Button className="me-2" variant="primary" type="submit" style={{width: '25%'}}
                                disabled={isLoading}>{isLoading ? 'Loading...' : 'Register'}</Button>
                        <Button variant="warning" style={{width: '25%'}} onClick={onCancel}>Cancel</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default RegistrationForm;