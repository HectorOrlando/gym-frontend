// src\interfaces\users-list.ts

export interface UsersListResponse {
    users: User[];
}

export interface User {
    _id:   string;
    name:  string;
    email: string;
}
