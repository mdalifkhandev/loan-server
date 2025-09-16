import { Router } from "express";
import { AuthRouter } from "../module/auth/auth.route";
import { UserRouter } from "../module/profile/profile.route";
import { ApplyLoneRouter } from "../module/aplyLone/applyLone.route";

const router=Router()

const moduleRoute=[
    {
        path:"/auth",
        rout:AuthRouter
    },
    {
        path:'/user',
        rout:UserRouter
    },
    {
        path:'/lone',
        rout:ApplyLoneRouter
    },
]

moduleRoute.forEach((route)=>router.use(route.path,route.rout))

export const Routers = router