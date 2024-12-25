import { UserRole } from "@prisma/client";
import { prisma } from "../prisma/prismaClient";
import { user } from "../types/user";
import { restaurant } from "../types/restaurant";
import { Request, Response } from "express";
export const createuser = async ({
  username,
  password,
  email,
  phone,
  role = "user",
}: user) => {
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
      phone: phone || "N/A",
      email: email,
      role: role,
    },
  });
};

/**
 * Finds a user based on the provided username.
 *
 * @param {string} username - The username of the user to find.
 * @returns {Promise<user | null>} The user object if found, otherwise null.
 */
export const finduserWithPassword = async (
  username: string,
  password: string,
) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
      password: password,
    },
  });
  return user;
};
/**
 * Finds a user based on the provided username.
 *
 * @param {string} username - The username of the user to find.
 * @returns {Promise<user | null>} The user object if found, otherwise null.
 */
export const finduserWithUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user;
};

/**
 * Updates a user's phone number and email address.
 *
 * @param {string} phone - The new phone number.
 * @param {string} email - The new email address.
 * @param {number} id - The ID of the user to update.
 * @returns {Promise<user>} The updated user object.
 */
export const updateUserDetail = async ({ phone, email, id }: user) => {
  const updateUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      phone,
      email,
    },
  });
  return updateUser;
};

/**
 * Updates a user's username.
 *
 * @param {string} oldusername - The current username of the user to update.
 * @param {string} newUsername - The new username to assign to the user.
 * @returns {Promise<user>} The updated user object.
 */
export const updateUsername = async (
  oldusername: string,
  newUsername: string,
) => {
  const updateUser = await prisma.user.update({
    where: {
      username: oldusername,
    },
    data: {
      username:
        newUsername /******  5a3b581f-d5d4-4606-bac1-9d578a9b266b  *******/,
    },
  });
  return updateUser;
};

/**
 * Updates a user's password in the database.
 *
 * @param {string} username - The username of the user to update.
 * @param {string} newHashedPassword - The new hashed password.
 * @returns {Promise<user>} The updated user object.
 */
export const updatePassword = async (
  username: string,
  newHashedPassword: string,
) => {
  const updatePassword = await prisma.user.update({
    where: {
      username,
    },
    data: {
      password: newHashedPassword,
    },
  });
};
export const deleteUser = async (username: string, password: string) => {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        username,
        password,
      },
    });
  } catch (e) {
    throw new Error("couldnt delete the user");
  }
};

export const updateRole = async (username: string, role: UserRole) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { username },
      data: {
        role,
      },
    });
  } catch (e) {
    console.log("update role err");
  }
};

export const updateRestaurantDetail = async (id = 1, newDetail: restaurant) => {
  try {
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id },
      data: {
        ...newDetail,
      },
    });
  } catch {
    console.log("update restaurant err");
  }
};

export const getRestaurantDetail = async (id = 1) => {
  try {
    const resturant = await prisma.restaurant.findFirst({
      where: { id },
    });
    return resturant;
  } catch {
    console.log("error in fniding restaurant data");
  }
};
export const userinfo = async (req: Request, res: Response) => {
  try {
    const foundUser = await finduserWithUsername(req.body.username);
    res.status(200).json({
      data: {
        foundUser,
      },
    });
  } catch {
    res.status(400).json({ message: "internal server error" });
  }
};
