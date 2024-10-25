import { Router } from "express";
import {
  createuserController,
  userAuthController,
  updateuserController,
  changePasswordController,
  changeUsernameController,
} from "../controllers/user.controller";
import {
  loginDataValidationMiddleware,
  signUpDataValidationMiddleware,
  updateDataValidationMiddleware,
  changePassValidationMiddleware,
  changeUsernameValidationMiddleware,
} from "../middlewares/userdata.validation";

const router = Router();

router.post("/signup", signUpDataValidationMiddleware, createuserController);
router.put("/update", updateDataValidationMiddleware, updateuserController);

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

// router.post("/login", loginDataValidationMiddleware, userAuthController);

export default router;
