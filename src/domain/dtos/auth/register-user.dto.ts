import { Validators } from '../../../config';

export class RegisterUserDTO {
  public name: string;
  public email: string;
  public password: string;

  private constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public static create(payload: {
    [key: string]: any;
  }): [string?, RegisterUserDTO?] {
    const { name, email, password } = payload;

    if (!name || !email || !password) {
      return ['Invalid payload, missing required fields'];
    }

    if (!Validators.email.test(email)) {
      return ['Invalid email'];
    }

    if (!Validators.minLength(8).test(password)) {
      return ['Invalid password, must be at least 8 characters long'];
    }

    return [undefined, new RegisterUserDTO(name, email, password)];
  }
}
