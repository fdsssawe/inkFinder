import api from "../http";

export default class AuthSercive{
    static async login(email , password){
        return api.post('/login', {email, password})
    }   

    static async registration(email , password){
        return api.post('/registration', {email, password})
    }  

    static async logout(){
        return api.post('/logout')
    }  

    static async googleAuthHandle(email, password){

        const isUser = await api.post('/isuser', {email})


        if(isUser.data){
            console.log("fdfd")
            return {
                response : await api.post('/login', {email, password}),
                job : "login"
            }
        }
        else{
            return {
                response : await api.post('/registration', {email, password}),
                job : "registration"
            }
        }
    }
}

