import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";

const validationRequest=(schema:ZodTypeAny)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            await schema.parseAsync({
                body:req.body,
                query:req.query
            })
            next()
        }catch(err){
            next(err)
        }
    }
}

export default validationRequest