import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRequest } from "../types/extras";

dotenv.config();

/**
 * Verify the JWT token sent in the Authorization header
 * @param {string} [role="user"] - The role of the user to verify
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware in the stack
 * @throws {401} - If the token is invalid or the user is not authorized
 */
export const verifyJWT = async (
  role = "user",
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (typeof authHeader == "string" && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
      (err: Error | null, decoded: JwtPayload | string | undefined) => {
        if (err) return res.status(401).json({ message: "unauthorised" });
        if (decoded && typeof decoded == "object" && decoded.UserInfo) {
          const roleFromJwt = decoded.UserInfo.role;
          if (roleFromJwt !== role) {
            return res.status(401).json({ message: "unauthorised" });
          }
          req.username = decoded.UserInfo.username;
          req.role = role;
          next();
        }
      }
    );
  } else return res.status(401).json({ message: "unauthorised" });
};
