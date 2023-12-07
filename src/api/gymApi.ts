// src\pages\api\gymApi.ts

import axios from 'axios';
import { User, UsersListResponse } from '@/interfaces/user';


export const gymApi = axios.create({
    // baseURL: 'https://gym-backend.upaje.com',
    baseURL: 'http://localhost:3008',
    
});

export const getUsers = async () => {
    const response = await gymApi.get<UsersListResponse>('/gym/users');
    return response.data.users;
};

export const createUser = async (userData: User) => {
    const response = await gymApi.post('/gym/user', userData);
    return response.data;
};

export const updateUser = async (userId: string, userData: User) => {
    const response = await gymApi.put(`/gym/user/${userId}`, userData);
    return response.data;
};

export const deleteUser = async (userId: string) => {
    const response = await gymApi.delete(`/gym/user/${userId}`);
    return response.data;
};

