import { NextFunction, Request, Response } from 'express';
import {
  NoDataError,
  DatabaseError,
  ErrorBase,
  UnauthorizedError,
  ValidationError,
} from '.';
import { ResponseCode } from './http-error-codes';

export const ApiErrorResponseHandler = (
  error: ErrorBase,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  switch (true) {
    case error instanceof ValidationError:
      return response.status(ResponseCode.BAD_REQUEST).send({
        status: 'failed',
        reason: 'Validation Error',
        message: error.message,
      });
    case error instanceof UnauthorizedError:
      return response.status(ResponseCode.UNAUTHORIZED).send({
        status: 'failed',
        reason: 'Unauthorized',
        message: error.message,
      });
    case error instanceof DatabaseError:
      return response.status(ResponseCode.UNAVAILABLE).send({
        status: 'failed',
        reason: 'Service Unavailable',
        message: error.message,
      });
    case error instanceof NoDataError:
      return response.status(ResponseCode.NOT_FOUND).send({
        status: 'failed',
        reason: 'API response error',
        message: error.message,
      });
    default:
      return response.status(ResponseCode.INTERNAL_ERROR).send({
        status: 'failed',
        reason: 'UNHANDLED',
        message: error?.message,
        cause: error?.cause,
      });
  }
};
