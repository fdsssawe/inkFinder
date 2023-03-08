import { ApiError } from "../exceptions/apiError.js"
import tokenService from '../services/TokenService.js'

export const authMiddleware = function (req, res , next){
    try{
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(ApiError.UnathorizedError())   
        }

        const accessToken = authorizationHeader.split(' ')[1]
        if(!accessToken){
            return next(ApiError.UnathorizedError()) 
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData){
            return next(ApiError.UnathorizedError()) 
        }

        req.user = userData
        next();
        
    }catch(e){
        return next(ApiError.UnathorizedError())
    }
}