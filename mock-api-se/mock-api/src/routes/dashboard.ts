import { Request, Response } from 'express';
import { getDashboard } from '../store';

export function dashboard(_req: Request, res: Response): void {
  res.status(200).json(getDashboard());
}
