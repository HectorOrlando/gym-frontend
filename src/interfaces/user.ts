// src/interfaces/user.ts
// https://app.quicktype.io/

export interface UsersListResponse {
    users: User[];
}

export interface User {
    _id?:   string;
    name:  string;
    email: string;
}

export interface ContextProps {
    users: User[];
    deleteUserById: (_id: string) => void;
    createUser: (user: User) => void;
    updateUserById: (_id:string, user: User) => void;
}


