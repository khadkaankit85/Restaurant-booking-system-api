//logic to create, update and delete user:)
import {
  createuser,
  finduserWithPassword,
  finduserWithUsername,
} from "../services/user.services";
import { CreateUserRequest, LoginRequest, user } from "../types/user";

import { Request, Response } from "express";

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
      await createuser({
        username: req.body.username,
        password: req.body.password,
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
 * Controller to handle user login.
 * @param req - Request object with username and password properties.
 * @returns Promise resolving to the user object if the login is successful.
 */
export const loginuserController = async (req: Request & LoginRequest) => {
  finduserWithPassword(req.body.username, req.body.password); //#TODO: hash the password before comparing:)
};
