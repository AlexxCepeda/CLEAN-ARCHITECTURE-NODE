import type { Request, Response } from 'express';
import { RegisterUserDTO } from '../../domain';

export class AuthController {
  constructor() {}

  registerUser = (req: Request, res: Response) => {
    const [error, data] = RegisterUserDTO.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }
    res.json(data);
  };

  loginUser = (req: Request, res: Response) => {
    res.json('Controller: User logged in');
  };
}
