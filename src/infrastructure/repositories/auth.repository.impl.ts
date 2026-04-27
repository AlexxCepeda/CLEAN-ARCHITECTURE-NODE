import {
  AuthRepository,
  AuthDataSource,
  RegisterUserDTO,
  UserResponseDTO,
} from '../../domain';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSource: AuthDataSource) {}

  register(payload: RegisterUserDTO): Promise<UserResponseDTO> {
    return this.authDataSource.register(payload);
  }
}
