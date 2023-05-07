export interface User {
    id: string;
    email: string;
    username: string;
    name: {
        firstname: string;
        lastname: string;
    }
    address: string;
    phone: string;
}