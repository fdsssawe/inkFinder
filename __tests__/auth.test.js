import axios from "axios"
import { API_URL } from "../client/csletmelearn/src/http"

test('Should login the user into account that was created earlier', async () => {
     const response = await axios.post(`${API_URL}/login`,{email : "testUser@gmail.com" , password : "testpass1"})
     expect(response.status).toBe(200)
     expect(response.data.user.email).toBe("testUser@gmail.com")
     expect(response.data.user.postsSaved.length>0).toBe(true)
    })

test('Should log out the user out of account', async () => {
    const response = await axios.post(`${API_URL}/logout`)
    expect(response.status).toBe(200)
    expect(response.data.acknowledged).toBe(true)
    expect(response.data.deletedCount).toBe(0)
   })
