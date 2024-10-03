//logic to create, update and delete user:)
import { createuser, finduser } from "../services/user.services";
import { CreateUserRequest, LoginRequest, user } from "../types/user";

export const createuserController = async (
  req: Request & CreateUserRequest
) => {
  createuser({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
  } as user);
};

export const loginuserController = async (req: Request & LoginRequest) => {
  finduser({
    username: req.body.username,
    // password:  hashedPassword,
  } as user);
};
