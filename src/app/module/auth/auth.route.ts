import { Router } from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middleware/auth";
// import { USER_ROLE } from "../../interface/types";
import validationRequest from "../../middleware/validationRequest";
import { AuthValidation } from "./auth.validation";

const router=Router()

router.post('/signup',validationRequest(AuthValidation.authValidationSchema),AuthController.userCreated)

router.post('/login',AuthController.userLogin)

router.post('/logout'/*,auth(USER_ROLE.user,USER_ROLE.admin,USER_ROLE.lender)*/,AuthController.LogOut)

router.post('/update-password'/*,auth(USER_ROLE.admin,USER_ROLE.user,USER_ROLE.lender)*/,AuthController.updathPassword)

router.post('/send-mail',AuthController.sendMail)

router.post('/otp-verify',AuthController.otpCodeVerify) 

router.post('/reset-password',AuthController.resetPassword) 

export const AuthRouter=router