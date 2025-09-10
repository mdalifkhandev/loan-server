import type mongoose from "mongoose";
import type { TErrorSource } from "../interface/errorType.ts";

const casError=(err:mongoose.Error.CastError)=>{
    const errorSources:TErrorSource=[
        {
            path:err.path,
            message:err.message
        }
    ]
    const statusCode=400
    return{
        message:'Cast Error',
        statusCode,
        errorSources
    }
}

export default casError