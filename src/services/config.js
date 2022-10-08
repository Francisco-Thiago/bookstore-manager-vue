import axios from 'axios';

export const http = axios.create({
    baseURL: 'http://localhost:8900/api/v1/'
})