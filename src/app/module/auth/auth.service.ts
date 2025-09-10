import AppError from "../../error/appError.ts";
import type { TLogin, TUser } from "./auth.interface.ts";
import { User } from "./auth.model.ts";
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import { createToken } from "./auth.utils.ts";

const userCreatedFromDB=async(data:TUser)=>{
    const secret=process.env.JWT_SECRET as string
    const user=await User.findOne({email:data.email})
    const salt=10
    if(user){
        throw AppError(409,"This Email is Alrady exisit")
    }
    const password=await bcrypt.hash(data.password, salt)
    const newData={
        ...data,
        password
    }
    const jwtPayload={
        email:data.email,
        role:data.role
    }
    const accessToken=createToken(jwtPayload,secret,3600*24)
    const resualt=await User.create(newData)
    return {
        accessToken,
        resualt
    }
}



const userLoginFromDB=async(data:TLogin)=>{
    const {email,password}=data
     const secret=process.env.JWT_SECRET as string
    const user=await User.findOne({email})
    if(!user){
        throw AppError(httpStatus.NOT_FOUND,'Email not exixit')
    }
    const passwordMatch=bcrypt.compare(password,user.password)
    if(!passwordMatch){
        throw AppError(httpStatus.NOT_FOUND,'Password incored')
    }
    const jwtPayload={
        email,
        role:user.role
    }
    const accessToken=createToken(jwtPayload,secret,3600*24)

    return accessToken
}

const getUserFromDB=async()=>{
    const resualt=await User.find()
    return resualt
}

export const AuthServices={
    userCreatedFromDB,
    userLoginFromDB,
    getUserFromDB
}