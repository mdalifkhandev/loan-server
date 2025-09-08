import { Router } from "express";
import { AuthController } from "./auth.controller.ts";

const router=Router()

router.post('/signup',AuthController.userCreated)


export const AuthRouter=router