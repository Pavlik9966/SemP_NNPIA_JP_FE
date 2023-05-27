export interface User {
    id: number;
    username: string;
    name: string;
    surname: string;
    dateOfBirth: Date;
    phone: string;
    email: string;
    address: Address;
    createdAt: Date;
}

export interface State {
    name: string;
    shortcut: string;
}

export interface Address {
    streetAddress: string;
    city: string;
    zipCode: string;
    state: State;
}

export interface Account {
    id: number;
    accountNumber: string;
    balance: number;
    createdAt: Date;
}

export interface TransactionUser {
    name: string;
    surname: string;
}

export interface Transaction {
    user: TransactionUser;
    accountNumberRecipient: string;
    accountNumberSender: string;
    transactionDate: Date;
    amount: number;
    createdAt: Date;
    description: string;
}

export interface NewTransaction {
    senderId: number;
    accountNumberRecipient: string;
    accountIdSender: number;
    transactionDate: Date;
    amount: number;
    createdAt: Date;
    description: string;
}

export interface NewAddress {
    streetAddress: string;
    city: string;
    zipCode: string;
    state: string;
}

export interface NewUser {
    username: string;
    password: string;
    name: string;
    surname: string;
    dateOfBirth: Date;
    phone: string;
    email: string;
    address: NewAddress;
    createdAt: Date;
}