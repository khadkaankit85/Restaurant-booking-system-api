import asyncHandler from "express-async-handler";
import { Request, RequestHandler, Response } from "express";
import { finduserWithUsername } from "../services/user.services";
import { authUserWithPassword } from "./user.controller";
import jwt, { JwtPayload, VerifyOptions } from "jsonwebtoken";

const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
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
    { expiresIn: "10s", algorithm: "HS256" },
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
    },
  );

  //   creating a secure cookie with refresh token
  res.cookie("restJWT", refreshToken, {
    httpOnly: true, //Flags the cookie to be accessible only by the web server not client
    secure: true, //https only
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  //sending the access token
  res.json({
    accessToken,
    redirect: "home",
    userinfo: {
      username: matchedUser.username,
      role: matchedUser.role,
      email: matchedUser.email,
    },
  });
});

const refresh = (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.JWT_ACCESS_TOKEN_SECRET as string,
    async (err: Error | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
        res.status(403).json({ message: "forbidden" });
        return;
      }

      if (decoded && typeof decoded == "object") {
        const foundUser = await finduserWithUsername(decoded.UserInfo.username);
        if (!foundUser) {
          res.status(401).json({ message: "unauthorizsed" });
          return;
        }

        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: foundUser.username,
              role: foundUser.role,
            },
          },
          process.env.JWT_ACCESS_TOKEN_SECRET as string,
          { expiresIn: "10s" },
        );

        res.json({ accessToken });
      } else {
        res.status(403).json({ message: "Invalid refresh token" });
        return;
      }
    },
  );
};

const logout = (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", {
    httpOnly: true, //Flags the cookie to be accessible only by the web server not client
    secure: true, //https only
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ message: "cookie cleared" });
};

export { login, logout, refresh };
