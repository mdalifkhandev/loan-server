import { model, Schema } from "mongoose";
import type { TUser } from "./auth.interface";

const userSchema=new Schema<TUser>({
    phone:{
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
    agreedToTerms:{
        type:Boolean,
        required:true
    }
},{
    timestamps:true
})

export const User= model('User',userSchema)