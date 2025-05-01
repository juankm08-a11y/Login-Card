import jwt from "jsonwebtoken";
import { User } from "./auth";

if (!process.env.JWT_SECRET) {
  throw new Error("no definido");
}

export function createJwtFor(user: User): string {
  const payload = { sub: user.id, name: user.name };

  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
}
