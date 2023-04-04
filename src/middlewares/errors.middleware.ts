import { ApiError } from '../exceptions/api-error';
import { httpCodes } from '../types';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  return res.status(httpCodes.SERVER_ERROR).json({ message: 'Unexpected server error' });
};
