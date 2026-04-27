import { PostgresDatabase } from '../../data/postgresql';
import { UserModel } from '../../data/postgresql';
import {
  CustomError,
  RegisterUserDTO,
  UserResponseDTO,
  type AuthDataSource,
} from '../../domain';
import { UserMapper } from '../mappers/user-mapper';

type HashMethod = (password: string) => string;

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(private readonly hashMethod: HashMethod) {}
  //async login(payload: TODO loginDTO): Promise<string> {
  // Implement login logic here
  //}
  async register(payload: RegisterUserDTO): Promise<UserResponseDTO> {
    try {
      const [user] = await PostgresDatabase.getInstance()
        .insert(UserModel)
        .values({ ...payload, password: this.hashMethod(payload.password) })
        .returning();

      if (!user) throw CustomError.internal();
      return UserResponseDTO.fromEntity(UserMapper.userEntityFromObject(user));
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internal();
    }
  }
}
