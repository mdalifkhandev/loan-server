import z from "zod"


const authValidationSchema=z.object({
  body:z.object({
    name:z.string({
      message:'Name is Required'
    }).min(4,{message:'Too short,minimum 3 creacter'}).max(10,{message:"Too Long,maximim 10 chrecter"}),
    email:z.email(),
    password:z.string(),
    role:z.enum(['admin',"user"]).default('user'),
    isDeleted:z.boolean().default(false)
  })
})

export const AuthValidation={
    authValidationSchema
}