import type { Types } from "mongoose"

export type TUserProfileUpdate={
    dateOfBirth?:string,
    gender?:'male'|'female'|'other'
    address?:string,
    city?:string,
    state?:string
    ZipCode?:string
    annualIncome?:number
    valueOfLandOnership?:number
    electrictiBill?:number
    mobileManyBill?:number
    existingLoanAmount?:string
    userId:Types.ObjectId
    isDeleted:boolean
}