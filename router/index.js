import { Router } from "express";
import userController from "../controllers/UserController.js";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import dalleService from "../services/DalleService.js";
import postService from "../services/PostsService.js";
import postController from "../controllers/PostController.js";
export const router = new Router();

router.post("/registration", body('email').isEmail(), body('password').isLength({ min: 4, max: 30 }), userController.registration)
router.post("/login", userController.login)
router.post("/logout", userController.logout)
router.get("/activate/:link", userController.activate)
router.get("/refresh", userController.refresh)
router.get("/users", authMiddleware, userController.getUsers)
router.post("/dalle", authMiddleware, dalleService.getGeneratedImage)
router.get("/posts", postService.getPosts)
router.post("/newposts", authMiddleware, postService.createPost)
router.get("/user/:id", authMiddleware, userController.getUsersPosts)
router.get("/post/:id", authMiddleware, postController.getPostById)
router.post("/post/:id/save", authMiddleware, postController.savePost)
router.get("/user/:id/saved", authMiddleware, postController.getSavedPosts) vedPosts)