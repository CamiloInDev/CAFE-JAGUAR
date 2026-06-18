import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('[FATAL ERROR]', err.stack || err.message || err);

  // Avoid leaking sensitive details in production
  const message = env.NODE_ENV === 'production'
    ? 'Error interno del servidor. Intente de nuevo.'
    : (err.message || 'Error interno del servidor. Intente de nuevo.');

  res.status(500).json({ error: message });
}
