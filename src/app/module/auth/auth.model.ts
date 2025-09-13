import { model, Schema } from "mongoose";
import type { TUser } from "./auth.interface.ts";

const userSchema=new Schema<TUser>({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
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
        enum:['user','lender','admin'],
        default:'user'
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
})

export const User= model('User',userSchema)