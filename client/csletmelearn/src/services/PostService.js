import api from "../http";

export default class PostService {
    static fetchUsers() {
        return api.get('/users')
    }
}


