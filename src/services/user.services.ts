import { prisma } from "../prisma/prismaClient";
import { user } from "../types/user";
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
