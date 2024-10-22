import { Router } from "express";
import {
  createuserController,
  userAuthController,
  updateuserController,
  changePasswordController,
} from "../controllers/user.controller";
import {
  loginDataValidationMiddleware,
  signUpDataValidationMiddleware,
  updateDataValidationMiddleware,
  changePassValidationMiddleware,
} from "../middlewares/userdata.validation";

const router = Router();

router.post("/signup", signUpDataValidationMiddleware, createuserController);
router.put("/update", updateDataValidationMiddleware, updateuserController);

router.put(
  "/changePass",
  changePassValidationMiddleware,
  changePasswordController
);

router.post("/login", loginDataValidationMiddleware, userAuthController);

export default router;
