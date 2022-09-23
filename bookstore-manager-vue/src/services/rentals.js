import { http } from './config'

export default {
    listAll: () => {
        return http.get("rentals");
    },

    save: (rental) => {
        return http.post('rental', rental);
    }
}