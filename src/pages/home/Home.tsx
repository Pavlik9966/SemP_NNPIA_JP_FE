import React, {useEffect, useState} from 'react';
import {Alert, Card, Container, Table} from "react-bootstrap";
import {Account, User} from "../../data/api/types";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface HomeProps {
    user: User;
}

const Home: React.FC<HomeProps> = ({user}) => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const API_URL = 'http://localhost:9000/api/v1';
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [show, setShow] = useState(true);

    useEffect(() => {
        setError('');
        setIsLoading(true);

        const fetchUserAccounts = async () => {
            try {
                if (user) {
                    const token = localStorage.getItem('token');

                    const response = await axios.get(`${API_URL}` + "/user/accounts", {
                        headers: {'Authorization': `Bearer ${token}`},
                        params: {userId: user.id},
                    });

                    setAccounts(response?.data);
                }
            } catch (error: any) {
                console.error('Error fetching user\'s accounts: ', error.message);
                setShow(true);
                setError('Error fetching user\'s accounts: ' + `${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserAccounts();
    }, []);

    const handleAccountClick = (selected: Account) => {
        navigate(`/transactions/${selected.id}`);
    };

    return (
        <div>
            <Container className="mt-3">
                {accounts && (
                    <Card>
                        <Card.Body>
                            <Card.Title>User information</Card.Title>
                            <Table striped bordered hover>
                                <tbody>
                                <tr>
                                    <td>Username:</td>
                                    <td>{user.username}</td>
                                </tr>
                                <tr>
                                    <td>Name:</td>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <td>Surname:</td>
                                    <td>{user.surname}</td>
                                </tr>
                                <tr>
                                    <td>Date of Birth:</td>
                                    <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <td>Phone:</td>
                                    <td>{user.phone}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td>Street Address:</td>
                                    <td>{user.address.streetAddress}</td>
                                </tr>
                                <tr>
                                    <td>City:</td>
                                    <td>{user.address.city}</td>
                                </tr>
                                <tr>
                                    <td>Zip Code:</td>
                                    <td>{user.address.zipCode}</td>
                                </tr>
                                <tr>
                                    <td>State:</td>
                                    <td>{user.address.state.name}</td>
                                </tr>
                                </tbody>
                            </Table>
                            <Card.Title>Bank Accounts</Card.Title>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Account Number</th>
                                    <th>Balance</th>
                                    <th>Created</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {accounts.map(account => (
                                    <tr key={account.id}>
                                        <td>{account.accountNumber}</td>
                                        <td>{account.balance} CZK</td>
                                        <td>{new Date(account.createdAt).toLocaleString()}</td>
                                        <td className="text-center" onClick={() => handleAccountClick(account)}>
                                            <img
                                                src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='16' fill='currentColor' class='bi bi-arrow-right' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'/%3E%3C/svg%3E"
                                                alt="arrow"
                                            />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                )}
                {isLoading && <p>Loading...</p>}
                {error && show &&
                    <Alert variant="danger" className="mb-0 mt-3 pb-0" onClose={() => setShow(false)}
                           dismissible>
                        <p>{error}</p>
                    </Alert>}
            </Container>
        </div>
    );
};

export default Home;