import { Request, Response, NextFunction } from 'express';
import { Exception } from './Exception';
import { ZodError } from 'zod';
import ResourceType from '../types/types';

export default class HandlerException {
  public static report(
    error: Exception,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    let exception;

    if (error instanceof ZodError) {
      exception = new Exception(
        'Validation request error',
        422,
        error.errors
      );

    } else {
      exception = new Exception(
        error.message || "Internal server error",
        error.status || 500,
        error.errors || null
      );

    }

    response.status(exception.status).send(exception as ResourceType);
  };
}
