import { http } from './config'

export default {
    listAll: () => {
        return http.get('rentals');
    },

    findById: (id) => {
        return http.get(`rentals/${id}`);
    },

    save: (rental) => {
        return http.post('rentals', rental);
    },

    expiration: (id, rental) => {
        return http.put(`rentals/expiration/${id}`, rental)
    },

    return: (id) => {
        return http.put(`rentals/return/${id}`)
    },

    delete: (id) => {
        return http.delete(`rentals/${id}`)
    }
}