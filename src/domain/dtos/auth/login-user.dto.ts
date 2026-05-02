import { Validators } from '../../../config';

export class LoginUserDTO {
  private constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  public static create(payload: {
    [key: string]: any;
  }): [string?, LoginUserDTO?] {
    const { email, password } = payload;

    if (!email || !password) {
      return ['Invalid payload, missing required fields'];
    }

    if (!Validators.email.test(email)) {
      return ['Invalid email'];
    }

    if (!Validators.minLength(8).test(password)) {
      return ['Invalid password, must be at least 8 characters long'];
    }

    return [undefined, new LoginUserDTO(email, password)];
  }
}
