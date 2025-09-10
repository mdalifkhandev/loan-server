import { Router } from "express";
import { AuthController } from "./auth.controller.ts";
import auth from "../../middleware/auth.ts";
import { USER_ROLE } from "../../interface/types.ts";

const router=Router()

router.post('/signup',AuthController.userCreated)

router.post('/login',AuthController.userLogin)

router.get('/',auth(USER_ROLE.admin),AuthController.getUser)


export const AuthRouter=router