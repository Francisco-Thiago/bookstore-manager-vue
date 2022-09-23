import { http } from './config'

export default {
    listAll: () => {
        return http.get("users")
    },

    findById: (id) => {
        return http.get(`users/${id}`);
    },

    saveUser: (user) => {
        return http.post('users/user', user)
    },

    saveAdmin: (admin) => {
        return http.post('users/admin', admin)
    },

    updateUser: (id, user) => {
        return http.put(`users/user/${id}`, user)
    },

    updateAdmin: (id, admin) => {
        return http.put(`users/admin/${id}`, admin)
    },

    deleteUser: (id) => {
        return http.delete(`users/user/${id}`)
    },

    deleteAdmin: (id) => {
        return http.delete(`users/admin/${id}`)
    }
}