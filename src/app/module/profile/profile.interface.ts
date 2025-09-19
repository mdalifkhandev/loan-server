import type { Types } from "mongoose"

export type TUserProfileUpdate = {
    parsonalInfo?: {
        firstName?: string,
        lastName?: string,
        dateOfBirth?: string,
        gender?: 'male' | 'female' | 'other'
    }
    contactInfo?: {
        address?: string,
        city?: string,
        state?: string,
        ZipCode?: string
    }
    finalcialInfo?: {
        annualIncome?: number
        valueOfLandOnership?: number
        electrictiBill?: number
        mobileManyBill?: number
    }
    existingLoanAmount?: string
    userId: Types.ObjectId
    isDeleted: boolean
}