import { model, Schema } from "mongoose";
import type { TUserProfileUpdate } from "./profile.interface";

const profileUpdateSchema = new Schema<TUserProfileUpdate>({
    personalInfo: {
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        dateOfBirth: {
            type: String,
            trim: true,
        },
        gender: {
            type: String,
            enum: ['mail', 'female', 'other'],
            trim: true,
        }
    },
    contactInfo: {
        address: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        zipCode: {
            type: String,
            trim: true,
        }
    },
    financialInfo: {
        annualIncome: {
            type: Number,
            trim: true,
        },
        valueOfLandOwnership: {
            type: Number,
            trim: true,
        },
        electricityBill: {
            type: Number,
            trim: true,
        },
        mobileMoneyBalance: {
            type: Number,
            trim: true,
        },
        existingLoanAmount: {
            type: Number,
            trim: true,
        },
        existingLoan: {
            type: Boolean,
        },
        terms: {
            type: Boolean,
        }
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const Profile = model('Profile', profileUpdateSchema)