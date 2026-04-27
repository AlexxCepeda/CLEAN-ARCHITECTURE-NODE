import {
  RegisterUserDTO,
  UserResponseDTO,
} from '../dtos/auth/register-user.dto';

export abstract class AuthRepository {
  //abstract login(payload: TODO loginDTO): Promise<string>;
  abstract register(payload: RegisterUserDTO): Promise<UserResponseDTO>;
}
