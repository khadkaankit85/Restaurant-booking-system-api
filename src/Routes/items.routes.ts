import { Express } from "express";
import { Router } from "express";
const router = Router();
import {
  createItemController,
  getItemsController,
  getItemByIdController,
  updateItemController,
} from "../controllers/item.controller";
import {
  createItemValidationMiddleware,
  getItemByIdValidationMiddleware,
  updateItemValidationMiddleware,
} from "../middlewares/item.middleware";
const itemRoutes = (app: Express) => {
  app.use("/items", router);
  router.get("/", getItemsController);
  router.get("/:id", getItemByIdValidationMiddleware, getItemByIdController);
  router.post("/", createItemValidationMiddleware, createItemController);
  router.put("/:id", updateItemValidationMiddleware, updateItemController);
};
export default itemRoutes;
