import * as dotenv from "dotenv"
import { ApiError } from "../exceptions/apiError.js"
import postService from "../services/PostsService.js"
import User from "../model/User.js"

dotenv.config()

class PostController {

    async getPostById(req, res, next) {
    try {
        const id = req.params.id
        const posts = await postService.getPostById(id);
        return res.json(posts);
    } catch (e) {
        next(e);
    }
    }

    async savePost(req, res, next) {
        try {
            const {user} = req.body
            const id = req.params.id
            const result = await postService.savePost(id , user);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async getSavedPosts(req, res, next) {
        try {
            const id = req.params.id
            const user = await User.findById(id)
            if(user.postsSaved){
                const result = await postService.getSavedPosts(user.postsSaved);
                return res.json(result);
            }
            return res.json([]);
        } catch (e) {
            next(e);
        }
    }

}

const postController = new PostController()

export default postController

