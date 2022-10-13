import { http } from './config'

export default {
    authenticate: (user) => {
        return http.post("users/authenticate", user)
    },

    listAll: (token) => {
        return http.get("users", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },

    findById: (id, token) => {
        return http.get(`users/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    },

    saveUser: (user, token) => {
        return http.post('users/user', user, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },

    updateUser: (id, user, token) => {
        return http.put(`users/user/${id}`, user, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },

    updateAdmin: (admin) => {
        return http.put(`users/admin`, admin)
    },

    deleteUser: (id, token) => {
        return http.delete(`users/user/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },

}