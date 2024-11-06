import { prisma } from "../prisma/prismaClient";

export const getAllTables = async () => {
  return await prisma.table.findMany();
};
