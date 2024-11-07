import { Item } from "@prisma/client";
import { prisma } from "../prisma/prismaClient";

export const createItem = async (data: Item) => {
  try {
    return await prisma.item.create({ data });
  } catch (error) {
    console.error("Error creating item:", error);
    return { error: "Error creating item" };
  }
};

export const getItems = async () => {
  try {
    return await prisma.item.findMany();
  } catch (error) {
    console.error("Error fetching items:", error);
    return { error: "Error fetching items" };
  }
};

export const getItemById = async (id: number) => {
  try {
    return await prisma.item.findUnique({ where: { id } });
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    return { error: "Error fetching item by ID" };
  }
};

export const updateItem = async (id: number, data: Item) => {
  try {
    return await prisma.item.update({ where: { id }, data });
  } catch (error) {
    console.error("Error updating item:", error);
    return { error: "Error updating item" };
  }
};

export const deleteItem = async (id: number) => {
  try {
    return await prisma.item.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting item:", error);
    return { error: "Error deleting item" };
  }
};
