import e from "express";
import { ApplyLoneController } from "./applyLone.controller.ts";
import auth from "../../middleware/auth.ts";
import { USER_ROLE } from "../../interface/types.ts";

const route=e.Router()

route.post('/apply',auth(USER_ROLE.user),ApplyLoneController.applyLoneFunctin)

route.put('/aprove',auth(USER_ROLE.lender),ApplyLoneController.aproveLone)

route.get('/',auth(USER_ROLE.lender,USER_ROLE.admin),ApplyLoneController.getAllLone)

export const ApplyLoneRouter=route