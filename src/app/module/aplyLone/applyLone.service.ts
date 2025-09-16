import AppError from "../../error/appError";
import { Profile } from "../profile/profile.model";
import type { TAplyLone } from "./applyLone.interface";
import httpStatus from 'http-status'
import { ApplyLone } from "./applyLone.model";

const applyLoneFromDB=async(data:TAplyLone)=>{
    const profile=await Profile.findOne({_id:data.profileId})
    if(!profile){
        throw AppError(httpStatus.BAD_REQUEST,'Profile does not exisit')
    }
    if(profile.isDeleted){
        throw AppError(httpStatus.BAD_REQUEST,'Profile is deleted')
    }
    const result=await ApplyLone.insertOne(data)
    return result
}

const aproveLoneFromDB=async(data:TAplyLone)=>{
    const lone=await ApplyLone.findOne({profileId:data.profileId})
    if(!lone){
        throw AppError(httpStatus.BAD_REQUEST,'This Lone is Not found')
    }
    if(lone.isDeleted){
        throw AppError(httpStatus.BAD_REQUEST,'This lone is canseled')
    }

    const result=await ApplyLone.findOneAndUpdate({profileId:data.profileId},data,{new:true})
    return result
}

const getAllLoneToDB=async()=>{
    const result=await ApplyLone.find()
    return result
}

export const ApplyLoneService={
    applyLoneFromDB,
    aproveLoneFromDB,
    getAllLoneToDB
}