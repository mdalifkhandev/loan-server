import type { Request, Response } from "express"
import { AuthServices } from "./auth.service.ts"
import httpStatus from 'http-status'
import catchAsync from "../../utils/catchAsync.ts"
import sendResponse from "../../utils/sendResponse.ts"

const userCreated=catchAsync(async(req,res)=>{
    const user=req.body
    const resualt=await AuthServices.userCreatedFromDB(user)
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:'User Created Successfully',
        data:resualt,
    })
})

export const AuthController={
    userCreated
}