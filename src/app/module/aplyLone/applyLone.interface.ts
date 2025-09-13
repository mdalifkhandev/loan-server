import type { Types } from "mongoose"

export type TAplyLone={
    profileId:Types.ObjectId
    loneAmount:number
    status:'Approve'|'Reject'|'Pending'
    ApproveLoneAmount?:number
    interested?:number
    termMonth?:number
    node:string
    isDeleted:boolean
}