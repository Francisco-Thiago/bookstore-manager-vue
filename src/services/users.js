import { http } from './config'

export default {
    authenticate: (user) => {
        return http.post("users/authenticate", user)
    },

    listAll: () => {
        return http.get("users")
    },

    findById: (id) => {
        return http.get(`users/${id}`);
    },

    saveUser: (user) => {
        return http.post('users/user', user)
    },

    saveAdmin: (admin, header) => {
        return http.post('users/admin', admin, header)
    },

    updateUser: (id, user) => {
        return http.put(`users/user/${id}`, user)
    },

    updateAdmin: (id, admin, header) => {
        return http.put(`users/admin/${id}`, admin, header)
    },

    deleteUser: (id) => {
        return http.delete(`users/user/${id}`)
    },

    deleteAdmin: (id, header) => {
        return http.delete(`users/admin/${id}`, header)
    }
}