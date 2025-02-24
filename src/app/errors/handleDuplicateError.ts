import { TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorMessage = `${extractedMessage} is already exist`

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate value!',
    errorMessage
  };
};

export default handleDuplicateError;