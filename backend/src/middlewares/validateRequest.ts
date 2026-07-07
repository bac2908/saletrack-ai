import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';

export function validateRequest(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
      });
    }

    const parsed = result.data as {
      body?: unknown;
      params?: unknown;
      query?: unknown;
    };

    if (parsed.body) {
      req.body = parsed.body;
    }
    if (parsed.params) {
      req.params = parsed.params as typeof req.params;
    }
    if (parsed.query) {
      req.query = parsed.query as typeof req.query;
    }

    next();
  };
}
