import axios from "axios"
import postServiceContainer from "../services/PostsService"

const postService = postServiceContainer.resolve("postService")

test('Should return the posts sorted according to algorithm(based on save posts)', async () => {
     const user = await axios.post("https://inkfindercl.vercel.app/api/login",{email : "testUser@gmail.com" , password : "testpass1"})
     const lastSavedPost = await axios.get(`https://inkfindercl.vercel.app/api/post/${user.data.user.postsSaved[0]}`)
     const setLoading = jest.fn();
     const setAllPosts = jest.fn();
     const setSortedPosts = jest.fn();
     await postService.fetchPosts(setLoading, setAllPosts, setSortedPosts, true, user.data.user);
     expect(setSortedPosts.mock.calls[0][0][0].prompt.includes(lastSavedPost.data.prompt.split(',')[lastSavedPost.data.prompt.split(',').length-1].trim())).toBe(true)
})

