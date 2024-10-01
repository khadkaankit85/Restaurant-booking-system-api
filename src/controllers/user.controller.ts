//logic to create, update and delete user:)
import { createuser } from "../services/user.services";
import { CreateUserRequest, user } from "../types/user";

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

export const loginuserController = async () => {
  console.log("you are logged in dude");
};
