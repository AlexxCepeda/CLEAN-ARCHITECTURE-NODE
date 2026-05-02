import { LoginUserDTO } from '../dtos/auth/login-user.dto';
import { RegisterUserDTO } from '../dtos/auth/register-user.dto';
import { UserResponseDTO } from '../dtos/auth/response-user.dto';

export abstract class AuthDataSource {
  abstract login(payload: LoginUserDTO): Promise<UserResponseDTO>;
  abstract register(payload: RegisterUserDTO): Promise<UserResponseDTO>;
}
