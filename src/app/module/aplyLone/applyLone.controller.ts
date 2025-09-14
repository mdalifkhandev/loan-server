import catchAsync from "../../utils/catchAsync.ts";
import sendResponse from "../../utils/sendResponse.ts";
import { ApplyLoneService } from "./applyLone.service.ts";
import httpStatus from 'http-status'

const applyLoneFunctin=catchAsync(async(req,res)=>{
    const result=await ApplyLoneService.applyLoneFromDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Apply Lone Successfully",
        data:result
    })
})

const aproveLone=catchAsync(async(req,res)=>{
    const result=await ApplyLoneService.aproveLoneFromDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Lone Aprove and Reject successfully ',
        data:result
    })
})

const getAllLone=catchAsync(async(req,res)=>{
    const result=await ApplyLoneService.getAllLoneToDB()
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"get all lone successfully",
        data:result
    })
})


export const ApplyLoneController={
    applyLoneFunctin,
    aproveLone,
    getAllLone
}