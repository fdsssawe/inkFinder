import axios from "axios"
import postService from "../services/PostsService";


test('Should return the posts sorted according to algorithm(based on save posts)', async () => {

     const user = await axios.post("https://inkfinder2.azurewebsites.net/api/login",{email : "testUser@gmail.com" , password : "testpass1"})
     const lastSavedPost = await axios.get(`https://inkfinder2.azurewebsites.net/api/post/${user.data.user.postsSaved[0]}`)
     const setLoading = jest.fn();
     const setAllPosts = jest.fn();
     const setSortedPosts = jest.fn();
     await postService.fetchPosts(setLoading, setAllPosts, setSortedPosts, true, user.data.user);
     expect(setSortedPosts.mock.calls[0][0][0].prompt.includes(lastSavedPost.data.prompt.split(',')[lastSavedPost.data.prompt.split(',').length-1].trim())).toBe(true)
})

