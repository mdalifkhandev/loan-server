import { Router } from "express";
import { AuthRouter } from "../module/auth/auth.route.ts";

const router=Router()

const moduleRoute=[
    {
        path:"/auth",
        rout:AuthRouter
    }
]

moduleRoute.forEach((route)=>router.use(route.path,route.rout))

export const Routers = router