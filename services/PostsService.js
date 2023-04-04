import * as dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"

import Post from "../model/Post.js"

dotenv.config()

class PostService{

    constructor(){
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })
    }

    async createPost(req,res){
        try{
        const {name , prompt , photo , author} = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            name,
            author,
            prompt,
            photo : photoUrl.url,
        })

        res.status(201).json({success : true , data : newPost})}
        catch(error){
            console.log(error)
            res.status(500).json({success: false , message : error})
        }

    }

    async getPosts(req,res){
        try{
            const posts = await Post.find({})

            res.status(200).json({success:true , data: posts})
        }
        catch(error){
            res.status(500).json({success:false , message: error})
        }
    }
}

const postService = new PostService()

export default postService