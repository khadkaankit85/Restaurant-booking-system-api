import {
  createuser,
  deleteUser,
  finduserWithPassword,
  finduserWithUsername,
  getRestaurantDetail,
  updatePassword,
  updateRestaurantDetail,
  updateRole,
  updateUsername,
} from "../services/user.services";
import {
  CreateUserRequest,
  LoginRequest,
  PasswordChangeRequest,
  user,
  UsernameChangeRequest,
} from "../types/user";

import { Request, Response } from "express";
import { comparePass, encryptPass } from "../Utils/EncryptPw";
import { Restaurant } from "@prisma/client";
import { restaurant } from "../types/restaurant";

/**
 * Controller to handle user authentication with password
 * @param req - Request object with username and password properties.
 * @returns Promise resolving to a response with a 401 status code if the user
 *          doesn't exist, a 401 status code if the password is invalid or a
 *          200 status code if the authentication is successful.
 */
export const authUserWithPassword = async (
  username: string,
  password: string
) => {
  try {
    const encryptedPassword = password;

    const user = await finduserWithUsername(username);
    // *! hash the password before comparing :)

    if (!user) {
      throw new Error("user not found");
    } else {
      const passwordMatch = await comparePass(encryptedPassword, user.password);
      if (passwordMatch) {
        return user;
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("user auth error " + error);
  }
};

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

export const updateuserController = async (
  req: Request & CreateUserRequest,
  res: Response
): Promise<void> => {};

export const changePasswordController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { oldpassword, newpassword, username } =
    req.body as PasswordChangeRequest;

  //  auth the user
  const authentication = await authUserWithPassword(username, oldpassword);
  if (authentication) {
    const newHashedPassword = await encryptPass(newpassword);
    await updatePassword(username, newHashedPassword);
    res.status(200).send("password changed successfully");
  } else {
    res.status(400).send("Data validation error occurred");
  }
};

export const changeUsernameController = async (req: Request, res: Response) => {
  const { newUsername, oldUsername } = req.body as UsernameChangeRequest;
  const userExists = await finduserWithUsername(newUsername);
  if (userExists) {
    res.status(400).send("Username alreaday taken");
    return;
  } else {
    updateUsername(oldUsername, newUsername);
    res
      .status(200)
      .send(`Usename updated from ${oldUsername} to ${newUsername}`);
    return;
  }
};

export const deleteUserController = async (
  req: Request & LoginRequest,
  res: Response
) => {
  try {
    const hashedPassword = await encryptPass(req.body.password);
    deleteUser(req.body.username, hashedPassword);
    res.status(200).send("user deleted");
  } catch {
    res.status(400).send("Unexpected error occrred");
  }
};

export const updateUserroleController = async (req: Request, res: Response) => {
  try {
    const { username, role } = req.body as user;
    if (role == "admin" || role == "user") {
      const updatedUser = await updateRole(username, role);
      res.send(`role updated to ${role}`);
    } else {
      res.status(400).send("invalid role request");
    }
  } catch {
    throw new Error("update role controller err");
  }
};

export const updateRestaurantDetailController = async (
  req: Request,
  res: Response
) => {
  try {
    const newDetail = req.body.newDetail as Restaurant;
    const updatedRestaurant = await updateRestaurantDetail(
      1,
      newDetail as restaurant
    );
    res.send("updated resturant detail");
  } catch {
    console.log("restaurant update error");
    res.send("internal server error occurred");
  }
};

export const getRestaurantDataController = async (
  req: Request,
  res: Response
) => {
  try {
    const restaurant = await getRestaurantDetail();
    res.json({
      data: {
        restaurant,
      },
    });
  } catch {
    console.log("restaurant update error");
    res.status(400).send("internal server error occurred");
  }
};
