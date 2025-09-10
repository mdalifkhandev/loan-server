import type { ErrorRequestHandler } from "express";
import type { TErrorSource } from "../interface/errorType.ts";
import validationError from "../error/validationError.ts";
import dublicateError from "../error/dublicatError.ts";
import casError from "../error/casError.ts";

const globalError: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode: number = 500
    let message: string = 'Something went wrong'
    let errorSources: TErrorSource = [
        {
            path: '/',
            message: err
        }
    ]

    if (err.name === 'ValidationError') {
        const validationErrors = validationError(err)
        message = validationErrors.message
        errorSources = validationErrors.errorSources
        statusCode = validationErrors.statusCode
    } else if (err.name === 'AppError') {
        message
        errorSources = [
            {
                path: "App Error",
                message: err.message
            }
        ]
    }else if(err.code===11000){
      const dublicateErrors=dublicateError(err)
      statusCode=dublicateErrors.statusCode
      errorSources=dublicateErrors.errorSources
      message=dublicateErrors.message
    }else if(err.name === 'CastError'){
        const catsError=casError(err)
        statusCode=catsError.statusCode
        message='Cast Error'
        errorSources=catsError.errorSources
    }else if (err instanceof Error) {
        message = err.message
        errorSources = [
            {
                path: 'Error',
                message: err.message
            }
        ]
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        steak: err.steak
    })
}

export default globalError