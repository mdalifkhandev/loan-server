import { Router } from "express";
import { AuthRouter } from "../module/auth/auth.route.ts";
import { UserRouter } from "../module/profile/profile.route.ts";
import { ApplyLoneRouter } from "../module/aplyLone/applyLone.route.ts";

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