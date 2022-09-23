import { http } from './config'

export default {
    listAll: () => {
        return http.get("users");
    },

    save: (user) => {
        return http.post('user', user);
    }
}