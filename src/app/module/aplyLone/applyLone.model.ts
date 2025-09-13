
import { model, Schema } from "mongoose";
import type { TAplyLone } from "./applyLone.interface.ts";

const applyLoneSchema = new Schema<TAplyLone>({
    profileId: {
        type: Schema.Types.ObjectId,
        require: true
    },
    loneAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Approve', 'Reject', 'Pending'],
        default: 'Pending'
    },
    ApproveLoneAmount: {
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
    node: {
        type: String,
        required: false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

export const ApplyLone=model('AplyLone',applyLoneSchema)