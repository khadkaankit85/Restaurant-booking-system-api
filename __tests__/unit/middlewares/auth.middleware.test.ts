import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  username?: string;
  role?: string;
}
import { verifyJWT } from "../../../src/middlewares/auth.middleware";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("verifyJWT middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return 401 if no authorization header is present", async () => {
    const middleware = verifyJWT();

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
  });

  it("should return 401 if authorization header does not start with 'Bearer '", async () => {
    req.headers = req.headers || {};
    req.headers.authorization = "InvalidToken";
    const middleware = verifyJWT();

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
  });

  it("should return 401 if token verification fails", async () => {
    req.headers = req.headers || {};
    req.headers.authorization = "Bearer invalidtoken";
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(new Error("Invalid token"), undefined);
    });
    const middleware = verifyJWT();

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
  });

  it("should return 403 if user role is not allowed", async () => {
    req.headers = req.headers || {};
    req.headers.authorization = "Bearer validtoken";
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(null, { UserInfo: { role: "user", username: "testuser" } });
    });
    const middleware = verifyJWT("admin");

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" });
  });
});
