import { http } from './config'

export default {
    listAll: (token) => {
        return http.get('rentals', {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    },

    findById: (id, token) => {
        return http.get(`rentals/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    },

    save: (rental, token) => {
        return http.post('rentals', rental, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    },

    expiration: (id, rental, token) => {
        return http.put(`rentals/expiration/${id}`, rental, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },
    
    return: (id, token) => {
        return http.put(`rentals/return/${id}`, {}, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },

    delete: (id, token) => {
        return http.delete(`rentals/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }
}