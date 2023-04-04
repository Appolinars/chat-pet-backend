import { ApiError } from '../exceptions/api-error';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validateBody = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return next(ApiError.BadRequest('Validation failed', errors.array()));
};
