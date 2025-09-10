import z, { email, string } from "zod"
import {  UserRole } from "../../interface/types.ts"


const authValidationSchema=z.object({
    body:z.object({
        name:z.string(),
        email:z.email(),
        password:z.string(),
        role:z.enum([...UserRole]) as unknown as [string,...string[]]
    })
})

export const AuthValidation={
    authValidationSchema
}