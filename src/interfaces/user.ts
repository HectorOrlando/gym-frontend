// src/interfaces/user.ts

// Definición del tipo de usuario
export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface UsersListResponse {
    users: User[];
}

export interface ContextProps {
    users: User[];
    deleteUserById: (id: string) => void;
    addUser: () => void;
}

// Acciones posibles
export type UserAction =
    | { type: 'ADD_USER'; payload: User }
    | { type: 'REMOVE_USER'; payload: { _id: string } }
    | { type: 'SET_USERS'; payload: UsersListResponse }


