import jwt, { type SignOptions } from 'jsonwebtoken';
import { envs } from './envs';

export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: SignOptions['expiresIn'] = '2h',
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        envs.JWT_SECRET_KEY,
        { expiresIn: duration },
        (err, token) => {
          if (err) {
            return resolve(null);
          }
          return resolve(token!);
        },
      );
    });
  }

  static async verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          return resolve(null);
        }
        return resolve(decoded as T);
      });
    });
  }
}
