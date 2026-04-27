import type { Request, Response } from 'express';
import { AuthRepository, RegisterUserDTO } from '../../domain';

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  registerUser = (req: Request, res: Response) => {
    const [error, data] = RegisterUserDTO.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }
    this.authRepository
      .register(data!)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  };

  loginUser = (req: Request, res: Response) => {
    res.json('Controller: User logged in');
  };
}
