import jwt from "jsonwebtoken";
export default function signToken(payload: {
  UserInfo: { username: string; role: string };
}): string {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET as string;
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secret, options);
}

export function verifyToken(token: string): any {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET as string;
  return jwt.verify(token, secret);
}
