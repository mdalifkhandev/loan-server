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
    console.log(user);
    
    const data=await AuthServices.userLoginFromDB(user)
    res.cookie("accessToken",data,{
        secure:true,
        httpOnly:true,
        sameSite:true,
        maxAge:100*60*60*24
    })
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Login successfully',
        data:'data'
    })
})

const getUser=catchAsync(async(req,res)=>{
    const resualt=await AuthServices.getUserFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'user get successfully',
        data:resualt
    })
})


export const AuthController={
    userCreated,
    userLogin,
    getUser
}