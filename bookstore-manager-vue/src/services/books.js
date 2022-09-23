import { http } from './config'

export default {
    listAll: () => {
        return http.get("books");
    },

    save: (book) => {
        return http.post('book', book)
    }
}