import { httpCodes } from '../types';
import { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response) => {
  return res.status(httpCodes.NOT_FOUND).json({
    message: 'Route not found',
  });
};
