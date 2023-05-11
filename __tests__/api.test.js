import axios from "axios"

test('Should login the user into account that was created earlier', async () => {
     const response = await axios.post("https://inkfinder2.azurewebsites.net/api/login",{email : "testUser@gmail.com" , password : "testpass1"})
     expect(response.status).toBe(200)
     expect(response.data.user.email).toBe("testUser@gmail.com")
     expect(response.data.user.postsSaved.length).toBe(0)
    })

test('Should log out the user out of account', async () => {
    const response = await axios.post("https://inkfinder2.azurewebsites.net/api/logout")
    expect(response.status).toBe(200)
    expect(response.data.acknowledged).toBe(true)
    expect(response.data.deletedCount).toBe(0)
   })

test('Should return posts from collectiom', async () => {
    const response = await axios.get("https://inkfinder2.azurewebsites.net/api/posts")
    expect(response.status).toBe(200)
    expect(response.data.success).toBe(true)
    expect(response.data.data.length).toBeTruthy()
   })