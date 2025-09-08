import type { Request, Response } from "express"
import { AuthServices } from "./auth.service.ts"

const userCreated=async(req:Request,res:Response)=>{
    const user=req.body
    const resualt=await AuthServices.userCreatedFromDB(user)
    return res.send(resualt)
}

export const AuthController={
    userCreated
}