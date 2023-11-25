// src\pages\api\gymApi.ts

import axios from 'axios';

const gymApi = axios.create({
    baseURL: 'https://gym-backend.upaje.com',
});

export default gymApi;
