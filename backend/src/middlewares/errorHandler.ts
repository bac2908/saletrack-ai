import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode = Number(error.statusCode ?? error.status ?? 500);

  res.status(statusCode).json({
    success: false,
    message: error.message ?? 'Internal server error',
  });
};
