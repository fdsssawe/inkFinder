import axios from "axios"

test('Should return posts from collectiom', async () => {
    const response = await axios.post("https://ifback.onrender.com/api/posts",{preference : ''})
    expect(response.status).toBe(200)
    expect(response.data.success).toBe(true)
    expect(response.data.data.length).toBeTruthy()
   })

test('Should return specific post by its id', async () => {
    const response = await axios.get("https://ifback.onrender.com/api/post/6448292d10ecfc116c88cbd1")
    expect(response.status).toBe(200)
    expect(response.data.author).toBe("643fb161ff71c17de6b7407a")
    expect(response.data.prompt).toBe("Cute ducks , Neo-traditional")
    expect(response.data.name).toBe("jhdfg@gmail.com")
   })


