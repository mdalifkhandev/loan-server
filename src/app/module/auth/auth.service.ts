import AppError from "../../error/appError.ts";
import type { TUser } from "./auth.interface.ts";
import { User } from "./auth.model.ts";
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import { createToken } from "./auth.utils.ts";

const userCreatedFromDB=async(data:TUser)=>{
    const user=await User.findOne({email:data.email})
    const salt=10
    const secret=process.env.JWT_SECRET as string
    if(user){
        throw AppError(httpStatus.CONFLICT,"This Email is Alrady exisit")
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

    const accessToken=createToken(jwtPayload,secret,3600)

    const resualt=await User.create(newData)
    return {
        accessToken,
        resualt
    }
}

export const AuthServices={
    userCreatedFromDB
}