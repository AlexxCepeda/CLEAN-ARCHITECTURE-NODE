import type { Request, Response } from 'express';
import {
  AuthRepository,
  CustomError,
  LoginUserDTO,
  LoginUserUseCase,
  RegisterUserDTO,
  RegisterUserUseCase,
} from '../../domain';
import { JwtAdapter } from '../../config';

export class AuthController {
  private readonly registerUserUseCase: RegisterUserUseCase;
  private readonly loginUserUseCase: LoginUserUseCase;

  constructor(private readonly authRepository: AuthRepository) {
    this.registerUserUseCase = new RegisterUserUseCase(
      this.authRepository,
      JwtAdapter.generateToken,
    );
    this.loginUserUseCase = new LoginUserUseCase(
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
    const [error, data] = LoginUserDTO.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }
    this.loginUserUseCase
      .execute(data!)
      .then((result) => res.status(200).json(result))
      .catch((err) => this.handleError(err, res));
  };
}
