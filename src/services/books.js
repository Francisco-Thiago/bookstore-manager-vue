import { http } from './config'

export default {
    listAll: (token) => {
        return http.get('books', {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    },

    findById: (id, token) => {
        return http.get(`books/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    },

    save: (book, token) => {
        return http.post('books', book, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },

    update: (id, book, token) => {
        return http.put(`books/${id}`, book, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },

    delete: (id, token) => {
        return http.delete(`books/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }
}