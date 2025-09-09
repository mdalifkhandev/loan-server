import type { ErrorRequestHandler } from "express";
import type { TErrorSource } from "../interface/errorType.ts";

const globalError:ErrorRequestHandler=(err,req,res,next)=>{
    let statusCode:number=500
    let message:string='Something went wrong'
    let errorSources:TErrorSource=[
        {
            path:'/',
            message:err
        }
    ]


    if(err.name==='AppError'){
        message=err.message
        errorSources=[
            {
                path:"App Error",
                message:err.message
            }
        ]
    }

    res.status(statusCode).json({
        success:false,
        message,
        errorSources,
        steak:err.steak
    })
}

export default globalError