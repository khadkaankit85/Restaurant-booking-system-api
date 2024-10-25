import { Router } from "express";
import {
  createuserController,
  userAuthController,
  updateuserController,
  changePasswordController,
  changeUsernameController,
  deleteUserController,
  updateUserroleController,
} from "../controllers/user.controller";
import {
  loginDataValidationMiddleware,
  signUpDataValidationMiddleware,
  updateDataValidationMiddleware,
  changePassValidationMiddleware,
  changeUsernameValidationMiddleware,
  updateRoleValidationMiddleware,
} from "../middlewares/userdata.validation";

const router = Router();

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

router.delete(
  "/remove-user",
  loginDataValidationMiddleware, //this route takes the same form data as login
  deleteUserController
);

// router.post("/login", loginDataValidationMiddleware, userAuthController);

export default router;
