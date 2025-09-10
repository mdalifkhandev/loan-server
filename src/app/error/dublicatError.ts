import type { TErrorSource } from "../interface/errorType.ts"
import httpStatus from 'http-status'

const dublicateError=(err:any)=>{
     const match = err.message.match(/"([^"]*)"/)
     const extendMessage=match.length
     const errorSources:TErrorSource=[
        {
            path:'dublicate Error',
            message:   `${extendMessage} Email is alrady exisit`
        }
     ]
     const statusCode=httpStatus.BAD_REQUEST

     return{
        errorSources,
        statusCode,
        message:'Email is alrady exisit'
     }
}

export default dublicateError