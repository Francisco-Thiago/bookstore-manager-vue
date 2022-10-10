import { http } from './config'

export default {
    listAll: () => {
        return http.get('books');
    },

    findById: (id) => {
        return http.get(`books/${id}`);
    },

    save: (book) => {
        return http.post('books', book)
    },

    update: (id, book) => {
        return http.put(`books/${id}`, book)
    },

    delete: (id) => {
        return http.delete(`books/${id}`)
    }
}