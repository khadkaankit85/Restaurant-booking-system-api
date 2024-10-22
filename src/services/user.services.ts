import { prisma } from "../prisma/prismaClient";
import { user } from "../types/user";
/**
 * Creates a new user in the database.
 *
 * @param {string} username - The username of the new user.
 * @param {string} password - The password of the new user.
 * @param {string} email - The email address of the new user.
 * @param {string} [phone] - The phone number of the new user.
 * @param {"user" | "admin"} [role="user"] - The role of the new user.
 * @returns {Promise<user>} The newly created user object.
 */
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
      phone: phone,
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
  password: string
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
  newUsername: string
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
  newHashedPassword: string
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
