import { RegisterUserDTO } from '../dtos/auth/register-user.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class AuthRepository {
  //abstract login(payload: TODO loginDTO): Promise<string>;
  abstract register(payload: RegisterUserDTO): Promise<UserEntity>;
}
