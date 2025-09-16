import mongoose from "mongoose";
import httpStatus from "http-status";
import type { TErrorSource } from "../interface/errorType";

const validationError=(err:mongoose.Error.ValidationError)=>{
    const errorSources:TErrorSource=Object.values(err.errors).map((val:mongoose.Error.ValidatorError |mongoose.Error.CastError)=>{
        return{
            path:val.path,
            message:val.message
        }
    })
    const statusCode=httpStatus.BAD_REQUEST
    return{
        statusCode,
        message:"ValidationError",
        errorSources
    }
}

export default validationError