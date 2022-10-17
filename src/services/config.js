import axios from 'axios';
//https://fs-book-manager.herokuapp.com
export const http = axios.create({
    baseURL: 'http://localhost:8900/api/v1/'
})