import api from "../http";

export default class UserService {
    static fetchUsers() {
        return api.get('/users')
    }

    static fetchImage(prompt){
        return api.post("/dalle" , {
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({prompt : prompt})
        })
    }
}


