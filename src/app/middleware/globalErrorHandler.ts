import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import handleZodError from '../errors/handleZodError'
import handleDuplicateError from '../errors/handleDuplicateError';
import handleCastError from '../errors/handleCastError';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    //setting default values
    let statusCode = 500
    let message = 'Something went wrong!'
    let errorMessage: string = ''

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessage = simplifiedError?.errorMessage
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessage = simplifiedError?.errorMessage
  }else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessage = simplifiedError?.errorMessage
  }

   else if (err instanceof Error) {
    message = err.message
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

 //ultimate return
 res.status(statusCode).json({
  success: false,
  message,
  errorMessage,
  err,
})
};
