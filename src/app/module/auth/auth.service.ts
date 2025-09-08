import type { TUser } from "./auth.interface.ts";
import { User } from "./auth.model.ts";

const userCreatedFromDB=async(data:TUser)=>{
    const resualt=await User.create(data)
    return resualt
}

export const AuthServices={
    userCreatedFromDB
}