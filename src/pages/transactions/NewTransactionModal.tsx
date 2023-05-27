import React, {useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import {NewTransaction} from "../../data/api/types";

interface TransactionModalProps {
    show: boolean;
    onClose: () => void;
    onCreate: (transaction: NewTransaction) => void;
}

const NewTransactionModal: React.FC<TransactionModalProps> = ({show, onClose, onCreate}) => {
    const [transactionData, setTransactionData] = useState<NewTransaction>({
        senderId: -1,
        accountNumberRecipient: "",
        accountIdSender: -1,
        transactionDate: new Date(),
        amount: 0,
        createdAt: new Date(),
        description: "",
    });
    const [isProgress, setIsProgress] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setTransactionData((previousState) => ({
            ...previousState,
            [name]: value,
        }));
    };

    const handleCreate = () => {
        const currentDateTime = new Date();
        const transactionDateTime = new Date(transactionData.transactionDate);

        if (transactionDateTime <= currentDateTime) {
            console.error("Invalid transaction date.");
            return;
        }

        setIsProgress(true);

        onCreate(transactionData);

        setTimeout(() => {
            setIsProgress(false);
            onClose();
        }, 2000);
    };

    return (
        <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>New Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="accountNumberRecipient">
                        <Form.Label>Account Number Recipient</Form.Label>
                        <Form.Control
                            type="text"
                            name="accountNumberRecipient"
                            placeholder="Add Account Recipient"
                            value={transactionData.accountNumberRecipient}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            name="amount"
                            placeholder="Add Amount"
                            value={transactionData.amount}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="transactionDate">
                        <Form.Label>Transaction Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="transactionDate"
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Add Description"
                            value={transactionData.description}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose} disabled={isProgress}>Cancel</Button>
                <Button variant="primary" onClick={handleCreate} disabled={isProgress}>
                    {isProgress ? "Creating..." : "Create"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewTransactionModal;