import { PostgresDatabase } from '../../data/postgresql';
import { UserModel } from '../../data/postgresql';
import {
  CustomError,
  RegisterUserDTO,
  UserEntity,
  type AuthDataSource,
} from '../../domain';

type HashMethod = (password: string) => string;

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(private readonly hashMethod: HashMethod) {}
  //async login(payload: TODO loginDTO): Promise<string> {
  // Implement login logic here
  //}
  async register(payload: RegisterUserDTO): Promise<UserEntity> {
    try {
      const [user] = await PostgresDatabase.getInstance()
        .insert(UserModel)
        .values({ ...payload, password: this.hashMethod(payload.password) })
        .returning();

      if (!user) throw CustomError.internal();
      return new UserEntity({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        img: user.img ?? undefined,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internal();
    }
  }
}
