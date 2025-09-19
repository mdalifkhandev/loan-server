import AppError from "../../error/appError";
import type { TLogin, TResetPassword, TUpdathPassword, TUser } from "./auth.interface";
import { User } from "./auth.model";
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import { createToken } from "./auth.utils";
import type { JwtPayload } from "jsonwebtoken";
import nodemailer from 'nodemailer'
import crypto from 'crypto'



let otpStore: number
let otpTimer: any

const userCreatedFromDB = async (data: TUser) => {
    const secret = process.env.JWT_SECRET as string
    const user = await User.findOne({ email: data.email })
    const salt = 10
    if (user) {
        throw AppError(httpStatus.CONFLICT, "This Email is Alrady exisit")
    }
    const password = await bcrypt.hash(data.password, salt)
    const newData = {
        ...data,
        password
    }  
    const jwtPayload = {
        email: data.email,
        role: data.role
    }
    const accessToken = createToken(jwtPayload, secret, 3600 * 24)
    const resualt = await User.create(newData)
    return {
        accessToken,
        resualt
    }
}

const userLoginFromDB = async (data: TLogin) => {
    const { email, password } = data
    const secret = process.env.JWT_SECRET as string
    const user = await User.findOne({ email })
    if (!user) {
        throw AppError(httpStatus.NOT_FOUND, 'Email not exixit')
    }
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        throw AppError(httpStatus.UNAUTHORIZED, 'Password incorrect')
    }
    if (user.isDeleted) {
        throw AppError(httpStatus.GONE, 'User is deleted')
    }
    const jwtPayload = {
        email,
        role: user.role
    }
    const accessToken = createToken(jwtPayload, secret, 3600 * 24)

    return {
        accessToken,
        user
    }
}



const LogOutFromDB = async (data: JwtPayload) => {
    const user = await User.findOne({ email: data.email })
    if (!user) {
        throw AppError(httpStatus.NOT_FOUND, 'User is not Found')
    }
    if (user.isDeleted) {
        throw AppError(httpStatus.NOT_FOUND, 'User is deleted')
    }

    return user
}

const updathPasswordFromDB = async (email: string, data: TUpdathPassword) => {
    const newConfirmMatch = data.newPassword === data.confirmPassword

    if (!newConfirmMatch) {
        throw AppError(httpStatus.BAD_REQUEST, 'New Password and Confirm Password Not Match')
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw AppError(httpStatus.BAD_REQUEST, 'User Not found')
    }

    const isPasswordMatch = await bcrypt.compare(data.currentPassword, user.password)

    if (!isPasswordMatch) {
        throw AppError(httpStatus.BAD_REQUEST, 'Incored Password')
    }

    const newHashPassword = await bcrypt.hash(data.newPassword, 10)

    const result = await User.findOneAndUpdate({ email }, { password: newHashPassword }, { new: true })

    return result
}


// forgate password 

//otp time expite function

const handleOtpTime = (value: any) => {

    otpStore = value
    if (otpStore !== 0) {
        if (otpTimer) clearTimeout(otpTimer)

        otpTimer = setTimeout(() => {
            otpStore = 0,
                otpTimer = null
            console.log('OTP expire');

        }, 60 * 1000 * 2
        )
    }
}

///mend mail to otp amd main function
const sendMailFromDB = async (email: string) => {
    //mail main function
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMILER_USER,
            pass: process.env.NODEMILER_PASS
        }
    })

    const user = await User.findOne({ email })
    if (!user) {
        throw AppError(httpStatus.BAD_REQUEST, 'User Not Found')
    }
    if (user.isDeleted) {
        throw AppError(httpStatus.BAD_REQUEST, "User is deleted")
    }

    const otp = Math.floor(100000 + Math.random() * 900000)
    //otp expire
    handleOtpTime(otp)

    try {
        await transport.sendMail({
            from: process.env.NODEMILER_USER,
            to: email,
            subject: "Your password reset code",
            text: `Your password reset code is: ${otpStore}. It expires in 2 minutes.`,
        });
    } catch (err: any) {
        console.log(err);
        throw AppError(httpStatus.INTERNAL_SERVER_ERROR, ` OTP send faild ${err.message}`)

    }
    return {
        email,
        otpStore
    }
}

///otp veryfi depandent by send email 
const otpCodeVerifyFromDB = async (otp: number, email: string) => {
    console.log(otp,otpStore,email);
    
    const user = await User.findOne({ email })
    if (!user) {
        throw AppError(httpStatus.BAD_REQUEST,'user not found')
    }

    if(user.isDeleted){
        throw AppError(httpStatus.BAD_REQUEST,'user is deleted')
    }

    const isOtpMatch = otpStore === otp
    if (!isOtpMatch) {
        throw AppError(httpStatus.BAD_REQUEST, 'OTP Invalid')
    }
    if (otpTimer === null) {
        throw AppError(httpStatus.BAD_REQUEST, 'OTP Time Expire')
    }
    return "Code verified. You may reset your password now."
}

//reset password depandent by otp verify  
const resetPasswordFromDB = async (data: TResetPassword) => {
    const newPassword = data.newPassword
    const confirmPassword = data.confirmPassword
    const email = data.email
    const user=await User.findOne({email})
    if (!user) {
        throw AppError(httpStatus.BAD_REQUEST,'user not found')
    }

    if(user.isDeleted){
        throw AppError(httpStatus.BAD_REQUEST,'user is deleted')
    }

    
    const isPasswordMatch = newPassword === confirmPassword
    if (!isPasswordMatch) {
        throw AppError(httpStatus.BAD_REQUEST, 'password not match')
    }
    
    const oldPasswordMatch=await bcrypt.compare(newPassword,user.password)
    if(oldPasswordMatch){
        throw AppError(httpStatus.BAD_REQUEST,'New Password must be different from the old password')
    }

    const password=await bcrypt.hash(newPassword,10)

    const result = await User.findOneAndUpdate({ email }, { password }, { new: true })
    return result
}

export const AuthServices = {
    userCreatedFromDB,
    userLoginFromDB,
    LogOutFromDB,
    updathPasswordFromDB,
    sendMailFromDB,
    otpCodeVerifyFromDB,
    resetPasswordFromDB 
}