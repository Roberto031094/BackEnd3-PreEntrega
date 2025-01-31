export class UserResponseDto {
  constructor({ first_name, last_name, email, cart, age, role }) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.cart = cart;
    this.age = age;
    this.role = role;
    this.full_name = `${first_name} ${last_name}`;
  }
}
