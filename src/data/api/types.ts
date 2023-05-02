export interface User {
    id: number;
    username: string;
    password: string;
    name: string;
    surname: string;
    dateOfBirth: string; // Note: use string or number depending on how you serialize date in your application.
    phone: string;
    email: string;
    address: Address;
    createdAt: string; // Note: use string or number depending on how you serialize date in your application.
    roles: Role[];
}

export interface State {
    id: number;
    name: string;
    shortcut: string;
}

export interface Address {
    id: number;
    streetAddress: string;
    city: string;
    zipCode: string;
    state: State;
}

export interface Role {
    id: number;
    name: string;
    users: User[];
}