import type { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// Create user
const userCreated = catchAsync(async (req: Request, res: Response) => {
    const user = req.body;
    const data = await AuthServices.userCreatedFromDB(user);
    const { accessToken } = data;

    res.cookie("accessToken", accessToken);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User Created Successfully',
        data: data
    });
});

// Login
const userLogin = catchAsync(async (req: Request, res: Response) => {
    const user = req.body;
    const data = await AuthServices.userLoginFromDB(user);

    res.cookie("accessToken", data.accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: true,
        maxAge: 100 * 60 * 60 * 24
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Login successfully',
        data: data
    });
});

// Logout
const LogOut = catchAsync(async (req: Request, res: Response) => {
    if (!req?.user) {
        return sendResponse(res, {
            statusCode: httpStatus.UNAUTHORIZED,
            success: false,
            message: 'Unauthorized: User not found in request',
            data: null
        });
    }

    const resualt = await AuthServices.LogOutFromDB(req?.user);
    res.cookie('accessToken', '');
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Logout Successfully',
        data: resualt
    });
});

// Update password
const updathPassword = catchAsync(async (req: Request, res: Response) => {
    if (!req?.user?.email) {
        return sendResponse(res, {
            statusCode: httpStatus.UNAUTHORIZED,
            success: false,
            message: 'Unauthorized: Email not found',
            data: null
        });
    }

    const data = req.body;
    const result = await AuthServices.updathPasswordFromDB(req?.user?.email, data);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password updated successfully',
        data: result
    });
});

// Send OTP
const sendMail = catchAsync(async (req: Request, res: Response) => {
    const email = req.body.email;
    const result = await AuthServices.sendMailFromDB(email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OTP sent successfully',
        data: result
    });
});

// Verify OTP
const otpCodeVerify = catchAsync(async (req: Request, res: Response) => {
    const { otp:recOpt, email } = req.body;
    const otp=Number(recOpt)
    const result = await AuthServices.otpCodeVerifyFromDB(otp, email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Code verified. You may reset your password now.",
        data: result
    });
});

// Reset password
const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.resetPasswordFromDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password reset successfully',
        data: result
    });
});

export const AuthController = {
    userCreated,
    userLogin,
    LogOut,
    updathPassword,
    sendMail,
    otpCodeVerify,
    resetPassword
};
