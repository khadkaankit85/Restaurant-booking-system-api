import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from "../../../src/services/item.services";
import { prisma } from "../../../src/prisma/prismaClient";
import { Item } from "@prisma/client";

jest.mock("../../../src/prisma/prismaClient");

describe("Item Service", () => {
  const mockItem: Item = {
    id: 1,
    name: "Test Item",
    price: 10.0,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createItem", () => {
    it("should create a new item", async () => {
      (prisma.item.create as jest.Mock).mockResolvedValue(mockItem);
      const result = await createItem(mockItem);
      expect(result).toEqual(mockItem);
      expect(prisma.item.create).toHaveBeenCalledWith({ data: mockItem });
    });

    it("should return an error if item creation fails", async () => {
      (prisma.item.create as jest.Mock).mockRejectedValue(
        new Error("Error creating item")
      );
      const result = await createItem(mockItem);
      expect(result).toEqual({ error: "Error creating item" });
    });
  });

  describe("getItems", () => {
    it("should fetch all items", async () => {
      (prisma.item.findMany as jest.Mock).mockResolvedValue([mockItem]);
      const result = await getItems();
      expect(result).toEqual([mockItem]);
      expect(prisma.item.findMany).toHaveBeenCalled();
    });

    it("should return an error if fetching items fails", async () => {
      (prisma.item.findMany as jest.Mock).mockRejectedValue(
        new Error("Error fetching items")
      );
      const result = await getItems();
      expect(result).toEqual({ error: "Error fetching items" });
    });
  });

  describe("getItemById", () => {
    it("should fetch an item by ID", async () => {
      (prisma.item.findUnique as jest.Mock).mockResolvedValue(mockItem);
      const result = await getItemById(1);
      expect(result).toEqual(mockItem);
      expect(prisma.item.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it("should return an error if fetching item by ID fails", async () => {
      (prisma.item.findUnique as jest.Mock).mockRejectedValue(
        new Error("Error fetching item by ID")
      );
      const result = await getItemById(1);
      expect(result).toEqual({ error: "Error fetching item by ID" });
    });
  });

  describe("updateItem", () => {
    it("should update an item", async () => {
      const updatedItem = { ...mockItem, name: "Updated Item" };
      (prisma.item.update as jest.Mock).mockResolvedValue(updatedItem);
      const result = await updateItem(1, updatedItem);
      expect(result).toEqual(updatedItem);
      expect(prisma.item.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updatedItem,
      });
    });

    it("should return an error if updating item fails", async () => {
      (prisma.item.update as jest.Mock).mockRejectedValue(
        new Error("Error updating item")
      );
      const result = await updateItem(1, mockItem);
      expect(result).toEqual({ error: "Error updating item" });
    });
  });

  describe("deleteItem", () => {
    it("should delete an item", async () => {
      (prisma.item.delete as jest.Mock).mockResolvedValue(mockItem);
      const result = await deleteItem(1);
      expect(result).toEqual(mockItem);
      expect(prisma.item.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it("should return an error if deleting item fails", async () => {
      (prisma.item.delete as jest.Mock).mockRejectedValue(
        new Error("Error deleting item")
      );
      const result = await deleteItem(1);
      expect(result).toEqual({ error: "Error deleting item" });
    });
  });
});
