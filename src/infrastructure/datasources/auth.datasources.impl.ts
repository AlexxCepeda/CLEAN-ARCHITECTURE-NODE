import { PostgresDatabase } from '../../data/postgresql';
import { UserModel } from '../../data/postgresql';
import {
  CustomError,
  RegisterUserDTO,
  UserResponseDTO,
  AuthDataSource,
  LoginUserDTO,
} from '../../domain';
import { UserMapper } from '../mappers/user-mapper';
import { eq } from 'drizzle-orm';

type HashMethod = (password: string) => string;
type CompareMethod = (password: string, hash: string) => boolean;

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hashMethod: HashMethod,
    private readonly compareMethod: CompareMethod,
  ) {}

  async login(payload: LoginUserDTO): Promise<UserResponseDTO> {
    const { email, password } = payload;
    try {
      const [user] = await PostgresDatabase.getInstance()
        .select()
        .from(UserModel)
        .where(eq(UserModel.email, email))
        .limit(1);

      if (!user) {
        throw CustomError.unauthorized('Invalid payload');
      }

      const isMatching = this.compareMethod(password, user.password);

      if (!isMatching) {
        throw CustomError.unauthorized('Invalid payload');
      }

      return UserResponseDTO.fromEntity(UserMapper.userEntityFromObject(user));
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internal();
    }
  }

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
