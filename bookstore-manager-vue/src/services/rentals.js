import { http } from './config'

export default {
    listAll: () => {
        return http.get("rentals");
    },

    findById: (id) => {
        return http.get(`rentals/${id}`);
    },

    save: (rental) => {
        return http.post('rentals', rental);
    },

    update: (id, rental) => {
        return http.put(`rentals/${id}`, rental)
    },

    delete: (id) => {
        return http.delete(`rentals/${id}`)
    }
}