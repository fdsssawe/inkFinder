import axios from "axios"


export const API_URL = `https://inkfinder-five.vercel.app/api`
// export const API_URL = `http://localhost:5000/api`
    
const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

api.interceptors.response.use((config)=>{
    return config
},async (error)=>{
    const originalRequest = error.config
    console.log(error)
    if(error.response.status == 401){
        try{
            const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token',response.data.accessToken)
            return api.request(originalRequest)
        }
        catch(e){
            console.log("not authorized")
        }
    }
}
)

export default api