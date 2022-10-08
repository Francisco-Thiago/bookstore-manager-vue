import { http } from './config'

export default {
    listAll: () => {
        return http.get('publishers');
    },

    findById: (id) => {
        return http.get(`publishers/${id}`);
    },

    save: (publisher) => {
        return http.post('publishers', publisher);
    },

    update: (id, publisher) => {
        return http.put(`publishers/${id}`, publisher)
    },

    delete: (id) => {
        return http.delete(`publishers/${id}`)
    }
}