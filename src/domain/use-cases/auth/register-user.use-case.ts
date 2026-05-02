import { JwtAdapter } from '../../../config';
import { RegisterUserDTO } from '../../dtos/auth/register-user.dto';
import type { UserResponseDTO } from '../../dtos/auth/response-user.dto';
import { CustomError } from '../../errors/custom.error';
import type { AuthRepository } from '../../repositories/auth.repository';
import { type SignOptions } from 'jsonwebtoken';

interface IRegisterUserUseCase {
  execute(registerUserDto: RegisterUserDTO): Promise<any>;
}

interface IUserToken {
  token: string | null;
  user: UserResponseDTO;
}

type SignTokenFunction = (
  payload: Object,
  duration?: number | SignOptions['expiresIn'] | undefined,
) => Promise<string | null>;

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignTokenFunction = JwtAdapter.generateToken,
  ) {}
  async execute(registerUserDto: RegisterUserDTO): Promise<IUserToken> {
    const user = await this.authRepository.register(registerUserDto);
    const token = await this.signToken({ id: user.id });

    if (!token) {
      throw CustomError.internal();
    }

    return { token, user };
  }
}
