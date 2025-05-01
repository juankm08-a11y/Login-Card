export interface User {
  id: number;
  name: string;
  email: string;
}

let nextId = 1;

export async function authenticate(
  username: string,
  _password: string
): Promise<User> {
  const email = username;
  const user: User = { id: nextId++, name: email, email };
  return user;
}
