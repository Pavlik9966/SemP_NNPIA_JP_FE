import React, {useState} from "react";
import {Account, Transaction} from "../../data/api/types";

interface TransactionsProps {
    account: Account;
}

const Transactions: React.FC<TransactionsProps> = ({account}) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    return (
        <>
        </>
    );
};

export default Transactions;