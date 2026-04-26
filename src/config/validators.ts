export class Validators {
  static get email() {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  }
  static get minLength() {
    return (length: number) => new RegExp(`^.{${length},}$`);
  }
}
