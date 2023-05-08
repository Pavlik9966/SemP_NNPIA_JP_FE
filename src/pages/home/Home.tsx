import React, {useEffect, useState} from 'react';
import {Card, Container, Table} from "react-bootstrap";
import {Account, User} from "../../data/api/types";
import axios from "axios";

interface HomeProps {
    user: User;
}

const Home: React.FC<HomeProps> = ({user}) => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setError('');
        setIsLoading(true);

        const fetchUserAccounts = async () => {
            try {
                const API_URL = import.meta.env.BASE_URL;
                const token = localStorage.getItem('token');

                const response = await axios.get(`${API_URL}/accounts`, {
                    headers: {'Authorization': `Bearer ${token}`},
                    params: {userId: user.id},
                });

                setAccounts(response.data);
            } catch (error: any) {
                console.error('Error fetching user\'s accounts: ', error.message);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserAccounts();
    }, []);

    /*const handleAccountClick = (account: Account) => {
        setSelectedAccount(account);

        // fetch transactions for selected account
        fetch(`/api/accounts/${account.id}/transactions`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(error => console.error(error));
    };*/

    return (
        <div>
            <Container className="mt-3">
                {user && (
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
                                    <td>{new Date(user.dateOfBirth).toISOString()}</td>
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
                                </tr>
                                </thead>
                                <tbody>
                                {/*{accounts.map(account => (
                                    <tr key={account.id} onClick={() => handleAccountClick(account)}>
                                        <td>{account.accountNumber}</td>
                                        <td>{account.balance}</td>
                                    </tr>
                                ))}*/}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                )}
                {isLoading && <p>Loading...</p>}
                {error && <div className="alert alert-danger">{error}</div>}
            </Container>
        </div>
    );
};

export default Home;