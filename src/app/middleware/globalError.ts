// import type { ErrorRequestHandler } from "express";
// import type { TErrorSource } from "../interface/errorType.ts";
// import validationError from "../error/validationError.ts";
// import dublicateError from "../error/dublicatError.ts";
// import casError from "../error/casError.ts";
// import { ZodError } from "zod";
// import zodError from "../error/zodError.ts";

// const globalError: ErrorRequestHandler = (err, req, res, next) => {
//     let statusCode: number = 500
//     let message: string = 'Something went wrong'
//     let errorSources: TErrorSource = [
//         {
//             path: '/',
//             message: err
//         }
//     ]

//     if(err.code===11000){
//       const dublicateErrors=dublicateError(err)
//       statusCode=dublicateErrors.statusCode
//       errorSources=dublicateErrors.errorSources
//       message=dublicateErrors.message
//     }else if(err instanceof ZodError){
//         const handleZodError=zodError(err)
//         message=handleZodError.message
//         errorSources=handleZodError.errorSources
//         statusCode=handleZodError.statusCode
//     } else if (err.name === 'AppError') {
//         message=err.message
//         statusCode=err.statusCode
//         errorSources = [
//             {
//                 path: "App Error",
//                 message: err.message
//             }
//         ]
//     }else if (err.name === 'ValidationError') {
//         const validationErrors = validationError(err)
//         message = validationErrors.message
//         errorSources = validationErrors.errorSources
//         statusCode = validationErrors.statusCode
//     }else if(err.name === 'CastError'){
//         const catsError=casError(err)
//         statusCode=catsError.statusCode
//         message='Cast Error'
//         errorSources=catsError.errorSources
//     }else if (err instanceof Error) {
//         message = err.message
//         errorSources = [
//             {
//                 path: 'Error',
//                 message: err.message
//             }
//         ]
//     }

//     res.status(statusCode).json({
//         success: false,
//         message,
//         errorSources,
//         steak: err.steak
//     })
// }

// export default globalError


import type { ErrorRequestHandler } from "express";
import type { TErrorSource } from "../interface/errorType.ts";
import validationError from "../error/validationError.ts";
import dublicateError from "../error/dublicatError.ts";
import casError from "../error/casError.ts";
import { ZodError } from "zod";
import zodError from "../error/zodError.ts";

const globalError: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorSources: TErrorSource = [];

  if (err.code === 11000) {
    const duplicateErrors = dublicateError(err);
    statusCode = duplicateErrors.statusCode;
    message = duplicateErrors.message;
    errorSources = duplicateErrors.errorSources;
  } else if (err instanceof ZodError) {
    const handleZodError = zodError(err);
    statusCode = handleZodError.statusCode;
    message = handleZodError.message;
    errorSources = handleZodError.errorSources;
  } else if (err.name === "AppError") {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "App Error",
        message: err.message,
      },
    ];
  } else if (err.name === "ValidationError") {
    const validationErrors = validationError(err);
    statusCode = validationErrors.statusCode;
    message = validationErrors.message;
    errorSources = validationErrors.errorSources;
  } else if (err.name === "CastError") {
    const castErrors = casError(err);
    statusCode = castErrors.statusCode;
    message = castErrors.message;
    errorSources = castErrors.errorSources;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
    errorSources = [
      {
        path: "Error",
        message: err.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: err.stack,
  });
};

export default globalError;
