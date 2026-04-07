import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { getSeedData } from '../store';

export function login(req: Request, res: Response): void {
  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  if (!username || !password) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'username and password are required.',
    });
    return;
  }

  const user = getSeedData().users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid username or password.',
    });
    return;
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  res.status(200).json({
    user: { id: user.id, name: user.name, role: user.role },
    token,
  });
}
