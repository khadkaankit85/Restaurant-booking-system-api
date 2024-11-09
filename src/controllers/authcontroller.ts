import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { finduserWithUsername } from "../services/user.services";
import { authUserWithPassword } from "./user.controller";
import jwt from "jsonwebtoken";

const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || password) {
    res.status(400).json({ message: "all fields are required" });
    return;
  }
  const matchedUser = await authUserWithPassword(username, password);
  if (!matchedUser) {
    res.status(401).json({ message: "unauthorised" });
    return;
  }

  if (
    !process.env.JWT_ACCESS_TOKEN_SECRET ||
    !process.env.JWT_REFRESH_TOKEN_SECRET
  ) {
    throw new Error("JWT secrets are missing in environment variables.");
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: matchedUser.username,
        roles: matchedUser.role,
      },
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: "10s", algorithm: "HS256" }
  );

  const refreshToken = jwt.sign(
    {
      userInfo: {
        username: matchedUser.username,
      },
    },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  //   creating a secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //Flags the cookie to be accessible only by the web server not client
    secure: true, //https only
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  //sending the access token
  res.json({ accessToken });
});

const refresh = (req: Request, res: Response) => {};

const logout = (req: Request, res: Response) => {};
