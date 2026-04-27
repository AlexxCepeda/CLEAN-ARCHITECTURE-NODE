import { RegisterUserDTO } from '../dtos/auth/register-user.dto';
import { UserResponseDTO } from '../dtos/auth/response-user.dto';

export abstract class AuthRepository {
  //abstract login(payload: TODO loginDTO): Promise<string>;
  abstract register(payload: RegisterUserDTO): Promise<UserResponseDTO>;
}
