import type { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../../config';
export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Invalid token format' });
    }

    const token = authHeader.split(' ').at(1);

    try {
      const decoded = await JwtAdapter.verifyToken<{ userId: string }>(token!);
      if (!decoded) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.body.token = decoded;
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
