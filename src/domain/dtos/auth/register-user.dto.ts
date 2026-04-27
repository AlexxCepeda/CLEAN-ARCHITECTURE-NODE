import { Validators } from '../../../config';

export class RegisterUserDTO {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role?: string[],
  ) {}

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
