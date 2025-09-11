import AppError from "../error/appError.ts";
import type { TUser_Role } from "../interface/types.ts";
import { User } from "../module/auth/auth.model.ts";
import catchAsync from "../utils/catchAsync.ts";
import httpStatus from 'http-status'
import jwt, { type JwtPayload } from 'jsonwebtoken'

const auth = (...RequiredRoll: TUser_Role[]) => {
    return catchAsync(async (req, res, next) => {
        const token =req.cookies.accessToken
        const jwtsecret = process.env.JWT_SECRET as string
        if (!token) {
            throw AppError(httpStatus.UNAUTHORIZED, 'You have unauthorized')
        }

        const decoded = jwt.verify(token, jwtsecret) as JwtPayload
        const {email,role}=decoded
        const exp=decoded.exp ?? 0
        const expire=new Date(exp*1000)
        const now=new Date()
        if(now>expire){
            throw AppError(httpStatus.NOT_FOUND,"Login Time out Login again")
        }

        if(RequiredRoll && !RequiredRoll.includes(role)){
            throw AppError(httpStatus.FORBIDDEN,'You are unauthorized .please login and try again')
        }

        const user=await User.findOne({email})

        if(!user){
            throw AppError(httpStatus.NOT_FOUND,'This account is not found')
        }

        if(user.isDeleted){
            throw AppError(httpStatus.BAD_REQUEST,"User is deleted")
        }

        req.user=decoded

        next()
    })
}

export default auth