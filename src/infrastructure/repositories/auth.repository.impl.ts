import {
  AuthRepository,
  AuthDataSource,
  UserEntity,
  RegisterUserDTO,
} from '../../domain';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSource: AuthDataSource) {}

  register(payload: RegisterUserDTO): Promise<UserEntity> {
    return this.authDataSource.register(payload);
  }
}
