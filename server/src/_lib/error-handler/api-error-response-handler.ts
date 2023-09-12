import { NextFunction, Request, Response } from 'express';
import { ErrorBase, ValidationError } from '.';
import { BAD_REQ_CODE } from './http-error-codes';

export const ApiErrorResponseHandler = (
  error: ErrorBase,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (error instanceof ValidationError) {
    return response.status(BAD_REQ_CODE).send({
      status: 'failed',
      reason: 'Validation Error',
      message: error.message,
    });
  } else {
    return response.status(500).send({
      status: 'failed',
      reason: 'UNHANDLED',
      message: error?.message,
      cause: error?.cause,
    });
  }
};
