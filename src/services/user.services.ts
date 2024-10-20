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
