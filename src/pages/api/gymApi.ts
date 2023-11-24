// src\pages\api\gymApi.ts

import axios from 'axios';

const gymApi = axios.create({
    baseURL: 'https://gym-backend.upaje.com',
});

export const getUsers = async () => {
    try {
        const response = await gymApi.get('/gym/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Puedes agregar funciones para otras operaciones CRUD (create, update, delete)
