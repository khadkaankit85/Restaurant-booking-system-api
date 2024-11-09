import { RequestHandler, Router } from "express";
import {
  createuserController,
  updateuserController,
  changePasswordController,
  changeUsernameController,
  deleteUserController,
  updateUserroleController,
  updateRestaurantDetailController,
  getRestaurantDataController,
} from "../controllers/user.controller";
import {
  loginDataValidationMiddleware,
  signUpDataValidationMiddleware,
  updateDataValidationMiddleware,
  changePassValidationMiddleware,
  changeUsernameValidationMiddleware,
  updateRoleValidationMiddleware,
  restaurantUpdateFormValidationMiddleware,
} from "../middlewares/userdata.validation";
import { login, logout, refresh } from "../controllers/authcontroller";

const router = Router();

router.get("/restaurant-data", getRestaurantDataController);

router.post("/signup", signUpDataValidationMiddleware, createuserController);

router.put(
  "/update-data",
  updateDataValidationMiddleware,
  updateuserController
);

router.put(
  "/change-password",
  changePassValidationMiddleware,
  changePasswordController
);

router.put(
  "/change-username",
  changeUsernameValidationMiddleware,
  changeUsernameController
);

router.put(
  "/upate-role",
  updateRoleValidationMiddleware,
  updateUserroleController
);

router.put(
  "/update-restaurant",
  restaurantUpdateFormValidationMiddleware,
  updateRestaurantDetailController
);

router.delete(
  "/remove-user",
  loginDataValidationMiddleware, //this route takes the same form data as login
  deleteUserController
);

router.post("/login", loginDataValidationMiddleware, login);
router.get("/refresh", refresh);
router.post("/logout", logout as RequestHandler);

export default router;
