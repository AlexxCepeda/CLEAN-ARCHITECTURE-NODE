import type { Request, Response } from 'express';
import {
  AuthRepository,
  CustomError,
  RegisterUserDTO,
  RegisterUserUseCase,
} from '../../domain';
import { JwtAdapter } from '../../config';

export class AuthController {
  private readonly registerUserUseCase: RegisterUserUseCase;

  constructor(private readonly authRepository: AuthRepository) {
    this.registerUserUseCase = new RegisterUserUseCase(
      this.authRepository,
      JwtAdapter.generateToken,
    );
  }

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
  registerUser = (req: Request, res: Response) => {
    const [error, data] = RegisterUserDTO.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }
    this.registerUserUseCase
      .execute(data!)
      .then((result) => res.status(201).json(result))
      .catch((err) => this.handleError(err, res));
  };

  loginUser = (req: Request, res: Response) => {
    res.json('Controller: User logged in');
  };
}
