import axios from 'axios';
export const http = axios.create({
    baseURL: 'https://fs-book-manager.herokuapp.com/api/v1/'
})