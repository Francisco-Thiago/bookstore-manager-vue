import { http } from './config'

export default {
    listAll: (token) => {
        return http.get('publishers', {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    },

    findById: (id, token) => {
        return http.get(`publishers/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    },

    save: (publisher, token) => {
        return http.post('publishers', publisher, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    },

    update: (id, publisher, token) => {
        return http.put(`publishers/${id}`, publisher, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },

    delete: (id, token) => {
        return http.delete(`publishers/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }
}