import e from "express";
import { ApplyLoneController } from "./applyLone.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../interface/types";

const route=e.Router()

route.post('/apply',auth(USER_ROLE.user),ApplyLoneController.applyLoneFunctin)

route.patch('/approve',auth(USER_ROLE.lender,USER_ROLE.admin),ApplyLoneController.aproveLone)

route.get('/:id',auth(USER_ROLE.lender,USER_ROLE.admin,USER_ROLE.user),ApplyLoneController.getSingleLone)

route.get('/',auth(USER_ROLE.lender,USER_ROLE.admin),ApplyLoneController.getAllLone)

export const ApplyLoneRouter=route
