import User from "../model/User.js"
import bcrypt from "bcrypt"
import uuid from "uuid"
import MailService from "./MailService.js"
import TokenService from "./TokenService.js"

const mailService = new MailService()
const tokenService = new TokenService()

class UserService{
    async registration (email, password){
        const candidate = await User.findOne({email})
        if (candidate){
            throw new Error(`There is account with such email : ${email}`)
        }
        const hashPassword = await bcrypt.hash(password,3);
        const activationLink = uuid.v4()
        const user = await User.create({email,password : hashPassword , activationLink})
        await mailService.sendActivisionMail(email,activationLink)
        const tokens = tokenService.generateTokens()
    }
}

export default UserService