export interface Payload {
    username: string;
    password: string;
}

export const authenticate = async (payload: Payload) => {
    return {token: "token"};
}