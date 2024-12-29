import {
  createItem,
  getItemById,
  getItems,
  updateItem,
} from "../services/item.services";
import { Request, Response } from "express";

export const createItemController = async (req: Request, res: Response) => {
  try {
    const item = await createItem(req.body.item);

    res.status(201).json(item);
  } catch {
    res.status(400).send("internal server error occurred");
  }
};

export const getItemsController = async (req: Request, res: Response) => {
  try {
    const items = await getItems();
    res.json(items);
  } catch {
    res.status(400).send("internal server error occurred");
  }
};

export const getItemByIdController = async (req: Request, res: Response) => {
  try {
    const item = await getItemById(parseInt(req.params.id));
    if (item === null) {
      res.status(404).json("item not found");
      return;
    }
    res.json(item);
  } catch {
    res.status(400).send("internal server error occurred");
  }
};

export const updateItemController = async (req: Request, res: Response) => {
  try {
    const updatedItem = await updateItem(req.body.item.id, req.body.item);
    res.status(200).send(updatedItem);
  } catch {
    res.status(400).send("internal server error occurred");
  }
};
