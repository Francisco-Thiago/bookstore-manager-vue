import { http } from './config'

export default {
    listAll: () => {
        return http.get("publishers");
    },

    save: (publisher) => {
        return http.post('publisher', publisher);
    }
}