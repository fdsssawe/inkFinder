import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"
import User from "../model/User.js"
import Post from "../model/Post.js"

dotenv.config()

class PostService {

    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })
    }

    async createPost(req, res) {
        try {
            const { name, prompt, photo, author } = req.body;
            const photoUrl = await cloudinary.uploader.upload(photo);

            const newPost = await Post.create({
                name,
                author,
                prompt,
                photo: photoUrl.url,
            })

            res.status(201).json({ success: true, data: newPost })
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: error })
        }

    }

    async getPosts(preferences) {
        try {
            const posts = await Post.find({})
            const sortedPosts = posts.sort((a, b) => {
                if (a.prompt.includes(preferences) && !b.prompt.includes(preferences)) {
                  return -1; 
                } else if (!a.prompt.includes(preferences) && b.prompt.includes(preferences)) {
                  return 1; 
                } else if (posts.length % 2 === 1 && !a.prompt.includes(preferences) && !b.prompt.includes(preferences)) {
                  return -1; 
                } else {
                  return 0; 
                }
              })
            if (preferences || preferences!="None"){
                return { success: true, data: sortedPosts }
            } 
            return { success: true, data: posts }
        }
        catch (error) {
            console.log(error)
            return { success: false, message: error }
        }
    }

    async getPostById(id) {
        try {
            const post = await Post.findById(id)
            return post
        }
        catch (error) {
            console.log(error)
        }
    }

    async savePost(postId , userId){
        try{
            const post = await Post.findById(postId)
            const user = await User.findById(userId)
            if (user?.postsSaved.includes(post._id)) {
                const index = user?.postsSaved.indexOf(post._id);
                if (index > -1) {
                    user?.postsSaved.splice(index, 1);
                    user.save()
                }
                return { ans: "Post already saved" }
            }
            user.postsSaved.push(post)
            user.save()
            return user.postsSaved
        }
        catch (error) {
            console.log(error)
        }
    }

    async getSavedPosts(ids) {
        try {
            const posts = await Promise.all(ids.map(async (id) => {
                const post = await Post.findById(id);
                return post;
            }));
            return posts;
        } catch (error) {
            console.log(error);
        }
    }


}

const postService = new PostService()

export default postService