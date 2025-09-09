import type { Response } from "express"

type TRespons<T>={
    statusCode:number
    success:boolean
    message:string
    data:T
    meta?:any
}

const sendResponse=<T>(res:Response,data:TRespons<T>)=>{
    res.status(data.statusCode).json({
        success:data.success,
        message:data.message,
        data:data.data,
        meta:data.meta
    })
}

export default sendResponse