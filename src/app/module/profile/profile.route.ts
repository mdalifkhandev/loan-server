import e from "express";
import auth from "../../middleware/auth.ts";
import { USER_ROLE } from "../../interface/types.ts";
import { UserController } from "./profile.controller.ts";

const router=e.Router()

router.delete('/delete',auth(USER_ROLE.user,USER_ROLE.admin,USER_ROLE.lender),UserController.userDeleted)

router.get('/',auth(USER_ROLE.admin),UserController.getUser)

router.patch('/update-profile',auth(USER_ROLE.admin,USER_ROLE.user,USER_ROLE.lender),UserController.profileUpdateAndCreate)

router.get('/profile',auth(USER_ROLE.admin,USER_ROLE.user,USER_ROLE.lender),UserController.getProfileInfo)

export const UserRouter=router