import { Router } from "express";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import dalleService from "../services/DalleService.js";
import postServiceContainer from "../services/PostsService.js";
import postController from "../controllers/PostController.js";
import userControllerContainer from "../controllers/UserController.js";
export const router = new Router();

const postService = postServiceContainer.resolve("postService")
const userControllerLogged = userControllerContainer.resolve("userControllerAuthed")


router.post("/registration", body('email').isEmail(), body('password').isLength({ min: 4, max: 30 }), userControllerContainer.resolve("userController").registration)

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The auth managing API
 * /login:
 *  post:
 *      tags: [Auth]
 *      summary: Login api call
 *      description : You will recive tockens and user info
 *      requestBody:
 *          required: true
 *          description: Enter proper email and password to login and get tockens and user info (Test user - "testing2024@gmail.com","12345678")
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200: 
 *              description: You will recive tockens and user info
 *          400:
 *              description: Provide proper email and password
 */
router.post("/login", userControllerContainer.resolve("userController").login)

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for logout
 * /logout:
 *  post:
 *      tags: [Auth]
 *      summary: Logout api call
 *      description : You will logout from your account
 *      responses:
 *          401: 
 *              description: You will be unable to logout without authorization
 */
router.post("/logout", authMiddleware, userControllerLogged.logout )
router.get("/activate/:link", userControllerContainer.resolve("userController").activate)
router.get("/refresh", userControllerContainer.resolve("userController").refresh)
router.get("/users", authMiddleware, userControllerContainer.resolve("userController").getUsers)
router.post("/dalle", authMiddleware, dalleService.getGeneratedImage)

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing API
 * /posts:
 *  post:
 *      tags: [Posts]
 *      summary: Get posts api call
 *      description : You will recive array of posts
 *      requestBody:
 *          required: true
 *          description: You can pass preference as a parameter to get posts based on their tags, for example by setting preferences to "Tribal" you will get array where posts with tags "Tribal" will be in front
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          preference:
 *                              type: string
 *      responses:
 *          200: 
 *              description: You will get posts
 */
router.post("/posts", postController.getPosts)
router.post("/newposts" , authMiddleware ,postService.createPost)

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /user/{id}:
 *  get:
 *    tags: [Users]
 *    summary: Get user api call
 *    description : You will recive user info and his posts
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          minimum: 1
 *        description: ID of the user (test user - 645c90abffe12d9d811a3141)
 *    responses:
 *        200: 
 *           description: You will get user info
 */

router.get("/user/:id"  , userControllerContainer.resolve("userController").getUsersPosts)

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing API
 * /post/{id}:
 *  get:
 *    tags: [Posts]
 *    summary: Get specific post api call
 *    description : You will recive post info
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          minimum: 1
 *        description: The post ID (example post id - 64458acd10ecfc116c88c46a)
 *    responses:
 *        200: 
 *           description: You will get post info (if test user used, you will get array with 1 post with the following prompt - "headphones made of glass")
 */

router.get("/post/:id"  , postController.getPostById)
router.post("/post/:id/save"  , postController.savePost)

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /user/{id}/saved:
 *  get:
 *    tags: [Users]
 *    summary: Get user`s saved post api call
 *    description : You will recive posts that user saved
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          minimum: 1
 *        description: ID of the user (test user - 65b7ab61a1fc8c9b3559961b)
 *    responses:
 *        200: 
 *           description: You will get user`s saved posts (if test user used, you will get array with 1 post with the following prompt - "big doritos chip with dip , Tribal")
 */

router.get("/user/:id/saved"  , postController.getSavedPosts)
router.post("/isuser"  , userControllerContainer.resolve("userController").getUser)