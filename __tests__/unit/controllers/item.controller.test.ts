import { Request, Response } from "express";
import * as itemServices from "../../../src/services/item.services";
import {
  createItemController,
  getItemsController,
  getItemByIdController,
  updateItemController,
} from "../../../src/controllers/item.controller";

jest.mock("../../../src/services/item.services");

describe("Item Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ send: jest.fn() });
    res = {
      json: jsonMock,
      status: statusMock,
    };
  });

  describe("createItemController", () => {
    it("should create an item and return it", async () => {
      const mockItem = { id: 1, name: "Test Item" };
      req.body = { item: mockItem };
      (itemServices.createItem as jest.Mock).mockResolvedValue(mockItem);

      await createItemController(req as Request, res as Response);

      expect(itemServices.createItem).toHaveBeenCalledWith(mockItem);
      expect(jsonMock).toHaveBeenCalledWith(mockItem);
    });

    it("should handle errors", async () => {
      req.body = { item: {} };
      (itemServices.createItem as jest.Mock).mockRejectedValue(
        new Error("Error")
      );

      await createItemController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(statusMock().send).toHaveBeenCalledWith(
        "internal server error occurred"
      );
    });
  });

  describe("getItemsController", () => {
    it("should return a list of items", async () => {
      const mockItems = [{ id: 1, name: "Test Item" }];
      (itemServices.getItems as jest.Mock).mockResolvedValue(mockItems);

      await getItemsController(req as Request, res as Response);

      expect(itemServices.getItems).toHaveBeenCalled();
      expect(jsonMock).toHaveBeenCalledWith(mockItems);
    });

    it("should handle errors", async () => {
      (itemServices.getItems as jest.Mock).mockRejectedValue(
        new Error("Error")
      );

      await getItemsController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(statusMock().send).toHaveBeenCalledWith(
        "internal server error occurred"
      );
    });
  });

  describe("getItemByIdController", () => {
    it("should return an item by id", async () => {
      const mockItem = { id: 1, name: "Test Item" };
      req.params = { id: "1" };
      (itemServices.getItemById as jest.Mock).mockResolvedValue(mockItem);

      await getItemByIdController(req as Request, res as Response);

      expect(itemServices.getItemById).toHaveBeenCalledWith(1);
      expect(jsonMock).toHaveBeenCalledWith(mockItem);
    });

    it("should handle errors", async () => {
      req.params = { id: "1" };
      (itemServices.getItemById as jest.Mock).mockRejectedValue(
        new Error("Error")
      );

      await getItemByIdController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(statusMock().send).toHaveBeenCalledWith(
        "internal server error occurred"
      );
    });
  });

  describe("updateItemController", () => {
    it("should update an item and return it", async () => {
      const mockItem = { id: 1, name: "Updated Item" };
      req.body = { item: mockItem };
      (itemServices.updateItem as jest.Mock).mockResolvedValue(mockItem);

      await updateItemController(req as Request, res as Response);

      expect(itemServices.updateItem).toHaveBeenCalledWith(
        mockItem.id,
        mockItem
      );
      expect(jsonMock).toHaveBeenCalledWith(mockItem);
    });

    it("should handle errors", async () => {
      req.body = { item: { id: 1 } };
      (itemServices.updateItem as jest.Mock).mockRejectedValue(
        new Error("Error")
      );

      await updateItemController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(statusMock().send).toHaveBeenCalledWith(
        "internal server error occurred"
      );
    });
  });
});
