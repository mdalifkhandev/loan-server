import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse" 
import httpStatus from 'http-status'
import { UserServices } from "./user.service"

const userDeleted=catchAsync(async(req,res)=>{
    const email=req.user?.email
    const resualt=await UserServices.userDeletedFromDB(email)
    res.cookie('accessToken','')
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'User Deleted successfully',
        data:resualt
    })
})


const getUser=catchAsync(async(req,res)=>{
    const resualt=await UserServices.getUserFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'user get successfully',
        data:resualt
    })
})

const profileUpdateAndCreate=catchAsync(async(req,res)=>{
    const data=req.body
    const result=await UserServices.profileUpdateAndCreateFromDB(data)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Profile Info update succesfully",
        data:result
    })
})

const getProfileInfo=catchAsync(async(req,res)=>{
    const resualt=await UserServices.getProfileInfoFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Get Profile info successfully',
        data:resualt
    })
})

const getSingleUser=catchAsync(async(req,res)=>{
    const email=req.user?.email as string
    const resualt=await UserServices.getSingleUserFromDB(email)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Get Single User info successfully',
        data:resualt
    })
})



export const UserController={
    getUser,
    userDeleted,
    profileUpdateAndCreate,
    getProfileInfo,
    getSingleUser
}