import catchAsync from "../../utils/catchAsync.ts"
import sendResponse from "../../utils/sendResponse.ts"
import { UserServices } from "./user.service.ts"
import httpStatus from 'http-status'

const userDeleted=catchAsync(async(req,res)=>{
    const email=req.user.email
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


export const UserController={
    getUser,
    userDeleted
}