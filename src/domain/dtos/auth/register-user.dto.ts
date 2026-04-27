import type { UserEntity } from '../..';
import { Validators } from '../../../config';

export class RegisterUserDTO {
  public name: string;
  public email: string;
  public password: string;
  public role: string[];

  private constructor(
    name: string,
    email: string,
    password: string,
    role: string[],
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  public static create(payload: {
    [key: string]: any;
  }): [string?, RegisterUserDTO?] {
    const { name, email, password, role } = payload;

    if (!name || !email || !password) {
      return ['Invalid payload, missing required fields'];
    }

    if (!Validators.email.test(email)) {
      return ['Invalid email'];
    }

    if (!Validators.minLength(8).test(password)) {
      return ['Invalid password, must be at least 8 characters long'];
    }

    return [undefined, new RegisterUserDTO(name, email, password, role)];
  }
}

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
