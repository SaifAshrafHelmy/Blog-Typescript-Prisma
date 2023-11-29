import { NextFunction, Request, Response } from 'express';
import ErrorResponse from './interfaces/ErrorResponse.js';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
export function notFoundHandler(
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  res.status(404);
  const error = new Error(`URL NOT FOUND - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  if (err instanceof ZodError) {
    res.status(422);
    err = fromZodError(err as ZodError);
  }

  res.status(statusCode);
  res.json({
    error: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  });
}

export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session.user) {
    next();
  } else {
    return res.status(401).json({
      message: "You don't have access to this route, Please login first.",
    });
  }
}
