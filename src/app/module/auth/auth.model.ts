import { model, Schema } from "mongoose";
import type { TUser } from "./auth.interface.ts";

const userSchema=new Schema<TUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','lender']
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
})


export const User= model('User',userSchema)