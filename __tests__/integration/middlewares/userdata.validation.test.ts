import { Request, Response, NextFunction } from "express";
import {
  signUpDataValidationMiddleware,
  updateDataValidationMiddleware,
  loginDataValidationMiddleware,
  changePassValidationMiddleware,
  changeUsernameValidationMiddleware,
  updateRoleValidationMiddleware,
  restaurantUpdateFormValidationMiddleware,
} from "../../../src/middlewares/userdata.validation";

describe("Validation Middlewares", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  const runMiddleware = async (
    middleware: any,
    req: Partial<Request>,
    res: Partial<Response>,
    next: NextFunction
  ) => {
    for (const fn of middleware) {
      await fn(req as Request, res as Response, next);
    }
  };

  describe("signUpDataValidationMiddleware", () => {
    it("should pass validation with valid data", async () => {
      req.body = {
        username: "validUser",
        password: "1234",
        email: "test@example.com",
      };
      await runMiddleware(signUpDataValidationMiddleware, req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it("should fail validation with invalid username", async () => {
      req.body = {
        username: "usr",
        password: "1234",
        email: "test@example.com",
      };
      await runMiddleware(signUpDataValidationMiddleware, req, res, next);
      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ errors: expect.any(Array) })
      );
    });
  });

  describe("updateDataValidationMiddleware", () => {
    it("should pass validation with valid data", async () => {
      req.body = {
        username: "validUser",
        password: "1234",
        email: "test@example.com",
      };
      await runMiddleware(updateDataValidationMiddleware, req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it("should fail validation with invalid email", async () => {
      req.body = {
        username: "validUser",
        password: "1234",
        email: "invalidEmail",
      };
      await runMiddleware(updateDataValidationMiddleware, req, res, next);
      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ errors: expect.any(Array) })
      );
    });
  });

  describe("loginDataValidationMiddleware", () => {
    it("should pass validation with valid data", async () => {
      req.body = { username: "validUser", password: "1234" };
      await runMiddleware(loginDataValidationMiddleware, req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it("should fail validation with invalid password", async () => {
      req.body = { username: "validUser", password: "123" };
      await runMiddleware(loginDataValidationMiddleware, req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.any(Array) })
      );
    });
  });

  describe("changePassValidationMiddleware", () => {
    it("should pass validation with valid data", async () => {
      req.body = {
        username: "validUser",
        oldpassword: "1234",
        newpassword: "5678",
      };
      await runMiddleware(changePassValidationMiddleware, req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it("should fail validation with invalid new password", async () => {
      req.body = {
        username: "validUser",
        oldpassword: "1234",
        newpassword: "567",
      };
      await runMiddleware(changePassValidationMiddleware, req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.any(Array) })
      );
    });
  });

  describe("changeUsernameValidationMiddleware", () => {
    it("should pass validation with valid data", async () => {
      req.body = { oldUsername: "oldUser", newUsername: "newUser" };
      await runMiddleware(changeUsernameValidationMiddleware, req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it("should fail validation with invalid new username", async () => {
      req.body = { oldUsername: "oldUser", newUsername: "usr" };
      await runMiddleware(changeUsernameValidationMiddleware, req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.any(Array) })
      );
    });
  });

  describe("updateRoleValidationMiddleware", () => {
    it("should pass validation with valid data", async () => {
      req.body = { username: "validUser", role: "admin" };
      await runMiddleware(updateRoleValidationMiddleware, req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it("should fail validation with invalid role", async () => {
      req.body = { username: "validUser", role: "adm" };
      await runMiddleware(updateRoleValidationMiddleware, req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.any(Array) })
      );
    });
  });

  describe("restaurantUpdateFormValidationMiddleware", () => {
    it("should pass validation with valid data", async () => {
      req.body = {
        contactNumber: "1234567890",
        email: "test@example.com",
        restaurantName: "Valid Restaurant",
      };
      await runMiddleware(
        restaurantUpdateFormValidationMiddleware,
        req,
        res,
        next
      );
      expect(next).toHaveBeenCalled();
    });

    it("should fail validation with invalid contact number", async () => {
      req.body = {
        contactNumber: "12345",
        email: "test@example.com",
        restaurantName: "Valid Restaurant",
      };
      await runMiddleware(
        restaurantUpdateFormValidationMiddleware,
        req,
        res,
        next
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ errors: expect.any(Array) })
      );
    });
  });
});
