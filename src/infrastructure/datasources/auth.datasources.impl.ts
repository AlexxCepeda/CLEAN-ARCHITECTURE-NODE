import {
  CustomError,
  RegisterUserDTO,
  UserEntity,
  type AuthDataSource,
} from '../../domain';

export class AuthDataSourceImpl implements AuthDataSource {
  //async login(payload: TODO loginDTO): Promise<string> {
  // Implement login logic here
  //}
  async register(payload: RegisterUserDTO): Promise<UserEntity> {
    try {
      return new UserEntity({
        id: '1',
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: ['user'],
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internal();
    }
  }
}
