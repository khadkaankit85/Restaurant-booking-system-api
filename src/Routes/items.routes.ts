import { Express, RequestHandler } from "express";
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
import { verifyJWT } from "../middlewares/auth.middleware";

const itemRoutes = (app: Express) => {
  app.use("/items", router);
  router.get("/", verifyJWT(), getItemsController);
  router.get(
    "/:id",
    verifyJWT(),
    getItemByIdValidationMiddleware,
    getItemByIdController,
  );
  router.post(
    "/",
    verifyJWT(),
    createItemValidationMiddleware,
    createItemController,
  );
  router.put(
    "/:id",
    verifyJWT(),
    updateItemValidationMiddleware,
    updateItemController,
  );
};

export default itemRoutes;
