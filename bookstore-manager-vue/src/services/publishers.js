import { http } from './config'

export default {
    listAll: () => {
        return http.get("publishers");
    },

    findById: (id) => {
        return http.get(`publishers/${id}`);
    },

    save: (publisher) => {
        return http.post('publishers', publisher);
    },

    update: (id, rental) => {
        return http.put(`publishers/${id}`, rental)
    },

    delete: (id) => {
        return http.delete(`publishers/${id}`)
    }
}