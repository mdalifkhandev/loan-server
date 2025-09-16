import {  type ZodError } from "zod";
import httpStatus from "http-status";
import type { TErrorSource } from "../interface/errorType";

const zodError=(err:ZodError)=>{
    const statusCode=httpStatus.BAD_REQUEST
    const errorSources:TErrorSource=err.issues.map((issue)=>{
        return{
            path:String(issue.path[issue.path.length-1]),
            message:issue.message
        }
    })
    return {
        success:false,
        statusCode,
        errorSources,
        message:'Zod Validation Error'
    }
}

export default zodError