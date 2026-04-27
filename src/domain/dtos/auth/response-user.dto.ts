import type { UserEntity } from '../..';

export class UserResponseDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly role: string[],
    public readonly img?: string,
  ) {}

  static fromEntity(entity: UserEntity): UserResponseDTO {
    return new UserResponseDTO(
      entity.id,
      entity.name,
      entity.email,
      entity.role,
      entity.img,
    );
  }
}
