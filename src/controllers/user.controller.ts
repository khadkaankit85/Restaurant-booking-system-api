//logic to create, update and delete user:)
import {
  createuser,
  finduserWithPassword,
  finduserWithUsername,
  updatePassword,
} from "../services/user.services";
import {
  CreateUserRequest,
  LoginRequest,
  PasswordChangeRequest,
  user,
} from "../types/user";

import { Request, Response } from "express";
import { comparePass, encryptPass } from "../Utils/EncryptPw";

/**
 * Controller to handle user creation.
 * @param req - Request object with username, password, email and phone
 *              properties.
 * @returns Promise resolving to the user object if the creation is successful.
 */
export const createuserController = async (
  req: Request & CreateUserRequest,
  res: Response
): Promise<void> => {
  try {
    const username: string = req.body.username;

    const userExists = await finduserWithUsername(username);
    if (userExists) {
      res.status(409).send("Username already taken");
    } else {
      const encryptedPassword = await encryptPass(req.body.password);
      await createuser({
        username: req.body.username,
        password: encryptedPassword,
        email: req.body.email,
        phone: req.body.phone,
      } as user);
      res.status(201).send("User created successfully");
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    res.status(500).send("An error occurred while creating the user");
  }
};

/**
 * Controller to handle user authentication.
 * @param req - Request object with username and password properties.
 * @returns Promise resolving to a response with a 401 status code if the user
 *          doesn't exist, a 401 status code if the password is invalid or a
 *          200 status code if the authentication is successful.
 */
export const userAuthController = async (
  username: string,
  password: string
) => {
  try {
    const encryptedPassword = password;

    const user = await finduserWithUsername(username);
    //#TODO: hash the password before comparing :)

    if (!user) {
      throw new Error("user not found");
    } else {
      const passwordMatch = await comparePass(encryptedPassword, user.password);
      if (passwordMatch) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("user auth error " + error);
  }
};

export const updateuserController = async (
  req: Request & CreateUserRequest,
  res: Response
): Promise<void> => {};

export const changePasswordController = async (
  req: Request & PasswordChangeRequest,
  res: Response
) => {
  const oldpassword = req.body.oldpassword;
  const newpassword = req.body.newpassword;
  const username = req.body.username;

  //  auth the user
  const authentication = await userAuthController(username, oldpassword);
  if (authentication) {
    const newHashedPassword = await encryptPass(newpassword);
    updatePassword(username, newHashedPassword);
    return res.status(200).send("password changed successfully");
  } else {
    return res.status(400).send("Data validation error occurred");
  }
};

export const changeUsernameController = async (
  req: Request & LoginRequest,
  res: Response
) => {};
