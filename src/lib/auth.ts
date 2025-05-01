export interface User {
  id: number;
  name: string;
  email: string;
}

export async function authenticate(
  username: string,
  password: string
): Promise<User | null> {
  if (username === "ingejhon01@gmail.com" && password === "ingejuan01***") {
    return {
      id: 1,
      name: "Juan Carlos Muñoz Pabon",
      email: "ingejhon01@gmail.com",
    };
  }
  return null;
}
