import axios from 'axios';
//https://fs-book-manager.herokuapp.com/api/v1/
export const http = axios.create({
    baseURL: 'http://localhost:8900/api/v1'
})