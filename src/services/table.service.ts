import { prisma } from "../prisma/prismaClient";

export const getAllTables = async () => {
  return await prisma.table.findMany();
};
export const getTableStatus = async (tableID: number) => {
  return await prisma.table.findUnique({
    where: {
      id: tableID,
    },
  });
};
