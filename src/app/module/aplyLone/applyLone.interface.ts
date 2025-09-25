import type { Types } from "mongoose"

export type TAplyLone={
    profileId:Types.ObjectId
    userId:Types.ObjectId
    loanAmount:number
    term:boolean
    creditScore:number
    city:string
    status:'approved'|'rejected'|'pending'
    ApproveLoanAmount?:number
    interested?:number
    termMonth?:number
    note?:string
    id?:string
    isDeleted:boolean
}