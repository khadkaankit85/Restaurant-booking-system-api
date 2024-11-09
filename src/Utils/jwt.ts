import jwt from "jsonwebtoken";
function signToken(payload: { id: string; role: string }): string {
  const secret = process.env.JWT_SECRET || "defaultSecret";
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secret, options);
}
export default signToken;
