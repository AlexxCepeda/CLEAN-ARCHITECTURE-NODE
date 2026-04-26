interface UserEntityOptions {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string[];
  img?: string;
}

export class UserEntity {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public role: string[];
  public img?: string;

  constructor({ id, name, email, password, role, img }: UserEntityOptions) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.img = img;
  }
}
