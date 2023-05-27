import React, {useEffect, useState} from "react";
import {NewTransaction, Transaction} from "../../data/api/types";
import axios from "axios";
import {Alert, Card, Col, Container, FormControl, InputGroup, Row, Table} from "react-bootstrap";
import {useParams} from "react-router";
import NewTransactionModal from "./NewTransactionModal";
import FloatingButton from "../../components/FloatingButton";

interface TransactionsProps {
}

const Transactions: React.FC<TransactionsProps> = ({}) => {
    const API_URL = 'http://localhost:9000/api/v1';
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const {selected} = useParams();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [show, setShow] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage] = useState(10);

    useEffect(() => {
        setError('');
        setIsLoading(true);

        const fetchTransactions = async () => {
            try {
                if (selected) {
                    const token = localStorage.getItem('token');

                    const response = await axios.get(`${API_URL}` + `/account/${selected}/transactions`, {
                        headers: {'Authorization': `Bearer ${token}`},
                    });

                    setTransactions(response?.data);
                }
            } catch (error: any) {
                console.error('Error fetching user\'s account\'s transactions: ', error.message);
                setShow(true);
                setError('Error fetching user\'s account\'s transactions: ' + `${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    useEffect(() => {
        const filtered = transactions.filter((transaction) =>
            transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTransactions(filtered);
    }, [searchTerm, transactions]);

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleCreateTransaction = async (transactionData: NewTransaction) => {
        console.log("Creating transaction: ", transactionData);

        transactionData.senderId = 1;
        transactionData.accountIdSender = parseInt(selected!!);
        transactionData.createdAt = new Date();

        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(`${API_URL}` + "/account/transaction/create", transactionData, {
                headers: {'Authorization': `Bearer ${token}`},
            });

            setTransactions([...transactions, response.data])
        } catch (error: any) {
            console.error('Error new transaction: ', error.message);
            setShow(true);
            setError('Error new transaction: ' + `${error.message}`);
        } finally {
            setIsLoading(false);
        }

        setShowModal(false);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <Container className="mt-3">
                {transactions && (
                    <Card>
                        <Card.Body>
                            <Card.Title>Bank Account Transactions</Card.Title>
                            <Row className="justify-content-center">
                                <Col md={6}>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="Search by description"
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Sender</th>
                                    <th>Bank Account Sender</th>
                                    <th>Bank Account Recipient</th>
                                    <th>Transaction Date</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Creation Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentTransactions.map((transaction, index) => (
                                    <tr key={index}>
                                        <td>{transaction.user.name} {transaction.user.surname}</td>
                                        <td>{transaction.accountNumberSender}</td>
                                        <td>{transaction.accountNumberRecipient}</td>
                                        <td>{new Date(transaction.transactionDate).toLocaleString()}</td>
                                        <td>{transaction.description}</td>
                                        <td>{transaction.amount} CZK</td>
                                        <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-center mt-3 mb-0">
                                <Pagination
                                    transactionsPerPage={transactionsPerPage}
                                    totalTransactions={filteredTransactions.length}
                                    paginate={paginate}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                )}
                {isLoading && <p>Loading...</p>}
                {error && show &&
                    <Alert variant="danger" className="mb-0 mt-3 pb-0" onClose={() => setShow(false)}
                           dismissible>
                        <p>{error}</p>
                    </Alert>}
                <NewTransactionModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onCreate={handleCreateTransaction}
                />
                <FloatingButton onClick={() => setShowModal(true)}/>
            </Container>
        </div>
    );
};

interface PaginationProps {
    transactionsPerPage: number;
    totalTransactions: number;
    paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({transactionsPerPage, totalTransactions, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalTransactions / transactionsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination mb-0">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <button className="page-link" onClick={() => paginate(number)}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Transactions;