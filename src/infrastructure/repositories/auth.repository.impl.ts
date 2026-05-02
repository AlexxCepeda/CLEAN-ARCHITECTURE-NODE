import {
  AuthRepository,
  AuthDataSource,
  RegisterUserDTO,
  UserResponseDTO,
  LoginUserDTO,
} from '../../domain';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSource: AuthDataSource) {}

  async login(payload: LoginUserDTO): Promise<UserResponseDTO> {
    return this.authDataSource.login(payload);
  }
  register(payload: RegisterUserDTO): Promise<UserResponseDTO> {
    return this.authDataSource.register(payload);
  }
}
