import User from "../model/User.js"
import bcrypt from "bcrypt"
import { v4 } from "uuid"
import mailService from "./MailService.js"
import tokenService from "./TokenService.js"
import UserDto from "../dtos/userDTO.js"
import * as dotenv from "dotenv"

dotenv.config()



class UserService{
    async registration (email, password){
        const candidate = await User.findOne({email})
        if (candidate){
            throw new Error(`There is account with such email : ${email}`)
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
}

const userService = new UserService()

export default userService