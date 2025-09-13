import AppError from "../../error/appError.ts"
import type { TUser } from "../auth/auth.interface.ts"
import { User } from "../auth/auth.model.ts"
import httpStatus from "http-status"
import type { TUserProfileUpdate } from "./profile.interface.ts"
import { Profile } from "./profile.model.ts"

const userDeletedFromDB=async(email:string)=>{
    const user=await User.findOne({email})
    if(!user){
        throw AppError(httpStatus.NOT_FOUND,'User Not Found')
    }
    if(user.isDeleted){
        throw AppError(httpStatus.BAD_REQUEST,'User is already deleted')
    }
    const result = await User.findOneAndUpdate({email},{isDeleted:true},{new:true})
    if(!result){
        throw AppError(httpStatus.NOT_FOUND,'User is not Found')
    }
    return result
}


const getUserFromDB=async()=>{
    const resualt=await User.find()
    const user=resualt as unknown as TUser
    if(user.isDeleted){
        throw AppError(httpStatus.NO_CONTENT,"USer is deleted")
    }
    return resualt
}

const profileUpdateAndCreateFromDB=async(data:TUserProfileUpdate)=>{
    const user=await User.findById(data.userId)
    if(!user){
        throw AppError(httpStatus.NOT_FOUND,'User Not Found')
    }
    if(user.isDeleted){
        throw AppError(httpStatus.BAD_REQUEST,'User is deleted')
    }
    const profile=await Profile.findOne({userId:data.userId})
    if(profile){
        const result=await Profile.findOneAndUpdate({userId:data.userId},data,{new:true})
        return result
    }else{
        const result=await Profile.create(data)
        return result
    }

}

const getProfileInfoFromDB=async()=>{
    const result=await Profile.find().populate("userId")
    return result
}

export const UserServices={
    getUserFromDB,
    userDeletedFromDB,
    profileUpdateAndCreateFromDB,
    getProfileInfoFromDB
}