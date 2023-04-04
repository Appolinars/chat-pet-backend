import { httpCodes } from '../types';
import { ValidationError } from 'express-validator/src/base';

export class ApiError extends Error {
  status;
  errors;

  constructor(status: httpCodes, message: string, errors: ValidationError[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError(message: string = 'Not authorized') {
    return new ApiError(httpCodes.UNAUTHORIZED, message);
  }

  static BadRequest(message: string, errors: ValidationError[] = []) {
    return new ApiError(httpCodes.BAD_REQUEST, message, errors);
  }

  static BadResponse(message: string) {
    return new ApiError(httpCodes.SERVER_ERROR, message);
  }
}
