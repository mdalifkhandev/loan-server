import type { Request, Response } from "express"
import { AuthServices } from "./auth.service.ts"
import httpStatus from 'http-status'
import catchAsync from "../../utils/catchAsync.ts"
import sendResponse from "../../utils/sendResponse.ts"

const userCreated=catchAsync(async(req,res)=>{
    const user=req.body
    
    const data=await AuthServices.userCreatedFromDB(user)
    const {accessToken,resualt}=data
    res.cookie("accessToken",accessToken)
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:'User Created Successfully',
        data:resualt
    })
})


const userLogin=catchAsync(async(req,res)=>{
    const user=req.body
    const data=await AuthServices.userLoginFromDB(user)
    res.cookie("accessToken",data.accessToken,{
        secure:true,
        httpOnly:true,
        sameSite:true,
        maxAge:100*60*60*24
    })
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Login successfully',
        data:data.user
    })
})



const LogOut=catchAsync(async(req,res)=>{
    const resualt=await AuthServices.LogOutFromDB(req.user)
    res.cookie('accessToken','')
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'User Logout Successfully',
        data:resualt
    })
})


const updathPassword=catchAsync(async(req,res)=>{
    const email=req.user.email
    const data=req.body
    const result=await AuthServices.updathPasswordFromDB(email,data)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Password Updath successfullt',
        data:result
    })
})



export const AuthController={
    userCreated,
    userLogin,
    LogOut,
    updathPassword
}