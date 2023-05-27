import React, {useState} from 'react';
import {Alert, Button, Container, Form, Spinner} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

interface RegistrationFormProps {
}

const Registration: React.FC<RegistrationFormProps> = ({}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const API_URL = 'http://localhost:9000/api/v1';
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [show, setShow] = useState(true);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setIsLoading(true);
        setError('');

        try {
        } catch (error: any) {
            console.error('Error registration: ', error.message);
            setShow(true);
            setError('Error registration: ' + `${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    function onCancel() {
    }

    return (
        <Container className="d-flex justify-content-center">
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
                        <div className="text-center">
                            <Button className="me-2" variant="primary" type="submit" style={{width: '25%'}}
                                    disabled={isLoading}>
                                {isLoading ? <Spinner animation="border" size="sm"/> : 'Register'}
                            </Button>
                            <Button variant="warning" style={{width: '25%'}} onClick={onCancel}>Cancel</Button>
                        </div>
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

export default Registration;