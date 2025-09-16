import type { ErrorRequestHandler } from "express";
import type { TErrorSource } from "../interface/errorType";
import validationError from "../error/validationError";
import dublicateError from "../error/dublicatError";
import casError from "../error/casError";
import { ZodError } from "zod";
import zodError from "../error/zodError";

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
