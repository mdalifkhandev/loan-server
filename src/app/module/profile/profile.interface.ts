import type { Types } from "mongoose";

export type TUserProfileUpdate = {
  personalInfo?: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    gender?: "male" | "female" | "other";
  };
  contactInfo?: {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  financialInfo?: {
    annualIncome?: number;
    electricityBill?: number;
    existingLoan?: boolean;
    existingLoanAmount?: number;
    mobileMoneyBalance?: number;
    terms?: boolean;
    valueOfLandOwnership?: number;
  };
  userId?: Types.ObjectId;
  isDeleted?: boolean;
};
