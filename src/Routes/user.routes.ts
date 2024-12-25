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
import { verifyJWT } from "../middlewares/auth.middleware";
import { userinfo } from "../services/user.services";

const router = Router();

router.get("/restaurant-data", verifyJWT(), getRestaurantDataController);

router.post("/signup", signUpDataValidationMiddleware, createuserController);

router.put(
  "/update-data",
  verifyJWT(),
  updateDataValidationMiddleware,
  updateuserController,
);

router.put(
  "/change-password",
  verifyJWT(),
  changePassValidationMiddleware,
  changePasswordController,
);

router.put(
  "/change-username",
  verifyJWT(),
  changeUsernameValidationMiddleware,
  changeUsernameController,
);

router.put(
  "/upate-role",
  verifyJWT("admin"),
  updateRoleValidationMiddleware,
  updateUserroleController,
);

router.put(
  "/update-restaurant",
  verifyJWT("admin"),
  restaurantUpdateFormValidationMiddleware,
  updateRestaurantDetailController,
);

router.delete(
  "/remove-user",
  verifyJWT(),
  loginDataValidationMiddleware,
  deleteUserController,
);

router.post("/login", loginDataValidationMiddleware, login);
router.get("/refresh", refresh);
router.post("/logout", logout as RequestHandler);
router.get("/userinfo", userinfo);
router.get("finduser", verifyJWT());

export default router;
