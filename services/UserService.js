import User from "../model/User.js"
import bcrypt from "bcrypt"
import { v4 } from "uuid"
import mailService from "./MailService.js"
import tokenService from "./TokenService.js"
import UserDto from "../dtos/userDTO.js"
import * as dotenv from "dotenv"
import { ApiError } from "../exceptions/apiError.js"

dotenv.config()



class UserService{
    async registration (email, password){
        const candidate = await User.findOne({email})
        if (candidate){
            throw ApiError.BadRequests(`There is account with such email : ${email}`)
        }
        const hashPassword = await bcrypt.hash(password,3);
        const activationLink = v4()
        const user = await User.create({email,password : hashPassword , activationLink})
        await mailService.sendActivisionMail(email,`${process.env.API_URL}/api/activate/${activationLink}`)
        const userDTO = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDTO})
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return{...tokens, user : userDTO}
    }

    async activate(activationLink){
        const user = await User.findOne({activationLink})
        if(!user){
            throw ApiError.BadRequests("Incorrect activation link")
        }
        user.isActivated = true
        await user.save()
    }

    async login(email , password){ 
        const user = await User.findOne({email})
        if(!user){
            throw ApiError.BadRequests('User not found')
        }
        const isPassEquels = await bcrypt.compare(password , user.password)
        if (!isPassEquels){
            throw ApiError.BadRequests('Wrong password or email')
        }
        const userDTO = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDTO})
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return{...tokens, user : userDTO}
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken){
        if (!refreshToken){
            throw ApiError.UnathorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokeFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokeFromDb){
            throw ApiError.UnathorizedError()
        }

        const user = await User.findById(userData.id)
        const userDTO = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDTO})
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return{...tokens, user : userDTO}
    }

    async getAllUsers() {
        const users = await User.find();
        return users;
    }
}

const userService = new UserService()

export default userService