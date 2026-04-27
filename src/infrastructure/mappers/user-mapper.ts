import { UserEntity } from '../../domain';

export class UserMapper {
  static userEntityFromObject(payload: { [key: string]: any }): UserEntity {
    const { id, email, password, role, img, name } = payload;
    return new UserEntity({
      id,
      name,
      email,
      password,
      role,
      img: img ?? undefined,
    });
  }
}
