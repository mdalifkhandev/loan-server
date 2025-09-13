import { model, Schema } from "mongoose";
import type { TUserProfileUpdate } from "./profile.interface.ts";

const profileUpdateSchema=new Schema<TUserProfileUpdate>({
    dateOfBirth:{
        type:String,
        required:false
    },
    gender:{
        type:String,
        enum:['male','female','other'],
        required:false
    },
    address:{
        type:String,
        required:false
    },
    city:{
        type:String,
        required:false
    },
    state:{
        type:String,
        required:false
    },
    ZipCode:{
        type:String,
        required:false
    },
    annualIncome:{
        type:Number,
        required:false
    },
    valueOfLandOnership:{
        type:Number,
        required:false
    },
    electrictiBill:{
        type:Number,
        required:false
    },
    mobileManyBill:{
        type:Number,
        required:false
    },
    existingLoanAmount:{
        type:String,
        default:'none',
        required:false
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

export const Profile=model('Profile',profileUpdateSchema)