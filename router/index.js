import { Router } from "express";
import userController from "../controllers/UserController.js";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const router = new Router();

router.post("/registration", body('email').isEmail() , body('password').isLength({min:4,max:30}) ,userController.registration)
router.post("/login" , userController.login)
router.post("/logout" , userController.logout)
router.get("/activate/:link" , userController.activate)
router.get("/refresh" , userController.refresh)
router.get("/users" , authMiddleware , userController.getUsers)