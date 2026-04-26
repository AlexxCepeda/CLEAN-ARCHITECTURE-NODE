import type { Request, Response } from 'express';

export class AuthController {
  constructor() {}

  registerUser = (req: Request, res: Response) => {
    res.json('Controller: User registered');
  };

  loginUser = (req: Request, res: Response) => {
    res.json('Controller: User logged in');
  };
}
