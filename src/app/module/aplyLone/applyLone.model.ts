import { model, Schema } from "mongoose";
import type { TAplyLone } from "./applyLone.interface";

const applyLoneSchema = new Schema<TAplyLone>({
    profileId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Profile'
    },
    userId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    term: {
        type: Boolean,
        required: true
    },
    creditScore: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    loanAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['approved', 'rejected', 'pending'],
        default: 'pending'
    },
    ApproveLoanAmount: {
        type: Number,
        required: false
    },
    interested: {
        type: Number,
        required: false
    },
    termMonth: {
        type: Number,
        required: false
    },
    note: {
        type: String,
        required: false
    },
    id: {
        type: String,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

export const ApplyLone=model('AplyLone',applyLoneSchema)