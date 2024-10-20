//logic to create, update and delete user:)
import {
  createuser,
  finduserWithPassword,
  finduserWithUsername,
} from "../services/user.services";
import { CreateUserRequest, LoginRequest, user } from "../types/user";

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
 * Controller to handle user login.
 * @param req - Request object with username and password properties.
 * @returns Promise resolving to the user object if the login is successful.
 */
export const loginuserController = async (
  req: Request & LoginRequest,
  res: Response
): Promise<void> => {
  try {
    const encryptedPassword = req.body.password;

    const user = await finduserWithUsername(req.body.username);
    //#TODO: hash the password before comparing :)

    if (!user) {
      res.status(401).send("User doesn't exist ");
    } else {
      const passwordMatch = await comparePass(encryptedPassword, user.password);
      if (passwordMatch) {
        res.status(200).send("You are logged in");
      } else {
        res.status(401).send("invalid credentials");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during login");
  }
};
