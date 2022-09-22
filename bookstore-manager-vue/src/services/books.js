import { http } from './config'

export default {
    listAll: () => {
        return http.get("books");
    }
}