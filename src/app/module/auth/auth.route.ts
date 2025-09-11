import { Router } from "express";
import { AuthController } from "./auth.controller.ts";
import auth from "../../middleware/auth.ts";
import { USER_ROLE } from "../../interface/types.ts";
import validationRequest from "../../middleware/validationRequest.ts";
import { AuthValidation } from "./auth.validation.ts";

const router=Router()

router.post('/signup',validationRequest(AuthValidation.authValidationSchema),AuthController.userCreated)

router.post('/login',AuthController.userLogin)

router.post('/logout',auth(USER_ROLE.user,USER_ROLE.admin,USER_ROLE.lender),AuthController.LogOut)

router.post('/update-password',auth(USER_ROLE.admin,USER_ROLE.user,USER_ROLE.lender),AuthController.updathPassword)

export const AuthRouter=router