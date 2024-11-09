import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};

export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};

const accessToken = () => {
  // jwt.
};
