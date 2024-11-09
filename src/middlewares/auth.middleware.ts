import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRequest } from "../types/extras";

dotenv.config();

export const verifyJWT = async (
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
        if (err) return res.status(401).json({ message: "forbidden" });
        if (decoded && typeof decoded == "object" && decoded.UserInfo) {
          req.username = decoded.UserInfo.username;
          req.role = decoded.UserInfo.role;
          next();
        }
      }
    );
  } else return res.status(401).json({ message: "unauthorised" });
};
