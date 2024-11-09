import { Request, Response, NextFunction, RequestHandler } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRequest } from "../types/extras";

dotenv.config();

/**
 * Middleware to verify JWT token and check if the user has the required role(s).
 * @param roles - The role(s) the user needs to have. Can be a single role or an array of roles.
 */
export const verifyJWT = (roles: "user" | "admin" = "user"): RequestHandler => {
  return async (req: UserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      try {
        jwt.verify(
          token,
          process.env.JWT_ACCESS_TOKEN_SECRET as string,
          (err: Error | null, decoded: JwtPayload | string | undefined) => {
            if (err) {
              res.status(401).json({ message: "Unauthorized" });
              return;
            }

            if (decoded && typeof decoded === "object" && decoded.UserInfo) {
              const roleFromJwt = decoded.UserInfo.role;

              // Check if the user's role is included in the allowed roles
              if (
                Array.isArray(roles)
                  ? !roles.includes(roleFromJwt)
                  : roleFromJwt !== roles
              ) {
                res.status(403).json({ message: "Forbidden" });
                return;
              }

              // Attach user info to request
              req.username = decoded.UserInfo.username;
              req.role = roleFromJwt;
              next();
            } else {
              res.status(401).json({ message: "Unauthorized" });
              return;
            }
          }
        );
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
  };
};
