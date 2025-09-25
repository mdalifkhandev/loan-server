import AppError from "../../error/appError";
import { Profile } from "../profile/profile.model";
import type { TAplyLone } from "./applyLone.interface";
import httpStatus from 'http-status'
import { ApplyLone } from "./applyLone.model";
import { User } from "../auth/auth.model";

const applyLoneFromDB = async (data: TAplyLone) => {
    const profile = await Profile.findOne({ _id: data.profileId })
    if (!profile) {
        throw AppError(httpStatus.BAD_REQUEST, 'Profile does not exisit')
    }
    if (profile.isDeleted) {
        throw AppError(httpStatus.BAD_REQUEST, 'Profile is deleted')
    }
    const result = await ApplyLone.insertOne(data)
    return result
}

const aproveLoneFromDB = async (data: TAplyLone) => {
    const lone = await ApplyLone.findById(data.id)
    if (!lone) {
        throw AppError(httpStatus.BAD_REQUEST, 'This Lone is Not found')
    }
    if (lone.isDeleted) {
        throw AppError(httpStatus.BAD_REQUEST, 'This lone is canseled')
    }

    const newData = {
        status: data.status,
        ApproveLoanAmount: data.ApproveLoanAmount,
        interested: data.interested,
        termMonth: data.termMonth,
        note: data.note
    }

    const result = await ApplyLone.findByIdAndUpdate(data.id, { $set: newData }, { new: true })
    return result
}

const getAllLoneToDB = async (email:string) => {
    const user=await User.findOne({email})
    if(!user){
        throw AppError(httpStatus.BAD_REQUEST,'User Does not exisit Pleace ligin')
    }
    if(user.isDeleted){
        throw AppError(httpStatus.BAD_REQUEST,'Login and try agani')
    }
    const result = await ApplyLone.find().populate('userId').populate('profileId')
    return result
}
const getSingleLoneToDB = async (id: string,email:string) => {
    const user=await User.findOne({email})
    if(!user){
        throw AppError(httpStatus.BAD_REQUEST,'User Does not exisit Pleace ligin')
    }
    if(user.isDeleted){
        throw AppError(httpStatus.BAD_REQUEST,'Login and try agani')
    }
    const lone = await ApplyLone.findOne({ userId: id }).populate('userId').populate('profileId')
    return lone
}

export const ApplyLoneService = {
    applyLoneFromDB,
    aproveLoneFromDB,
    getSingleLoneToDB,
    getAllLoneToDB
}