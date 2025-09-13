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

const AproveLone=catchAsync(async(req,res)=>{
    const result=await ApplyLoneService.aproveLoneFromDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Lone Aprove and Reject successfully ',
        data:result
    })
})


export const ApplyLoneController={
    applyLoneFunctin,
    AproveLone
}