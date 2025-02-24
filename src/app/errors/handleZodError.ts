import { ZodError} from 'zod';
import { TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {

  const errorMessage: string[] = err.issues.map(issue => {
    const errorField = issue.path[issue.path.length-1]
    const errorMessage = issue.message

    return `${errorField} is ${errorMessage}`
  }) 

  const statusCode = 400;
  const joinMessage = errorMessage.join(' | ')
  const msg = joinMessage.charAt(0).toUpperCase() + joinMessage.slice(1).toLowerCase()

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: msg
  };
};

export default handleZodError;