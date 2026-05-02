import { JwtAdapter } from '../../../config';
import type { LoginUserDTO } from '../../dtos/auth/login-user.dto';
import { RegisterUserDTO } from '../../dtos/auth/register-user.dto';
import type { UserResponseDTO } from '../../dtos/auth/response-user.dto';
import { CustomError } from '../../errors/custom.error';
import type { AuthRepository } from '../../repositories/auth.repository';
import { type SignOptions } from 'jsonwebtoken';

interface ILoginUserUseCase {
  execute(loginUserDto: LoginUserDTO): Promise<any>;
}

interface IUserToken {
  token: string | null;
  user: UserResponseDTO;
}

type SignTokenFunction = (
  payload: Object,
  duration?: number | SignOptions['expiresIn'] | undefined,
) => Promise<string | null>;

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignTokenFunction = JwtAdapter.generateToken,
  ) {}
  async execute(loginUserDto: LoginUserDTO): Promise<IUserToken> {
    const user = await this.authRepository.login(loginUserDto);
    const token = await this.signToken({ id: user.id });

    if (!token || !user) {
      throw CustomError.internal();
    }

    return { token, user };
  }
}
