import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import { tokenService } from '../services/token.service';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization || (req.headers.Authorization as string);
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
      return next(ApiError.UnauthorizedError('Headers are not provided'));
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError('Token is not provided'));
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError('Invalid token'));
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
