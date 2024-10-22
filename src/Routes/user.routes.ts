import { Router } from "express";
import {
  createuserController,
  userAuthController,
  updateuserController,
} from "../controllers/user.controller";
import {
  loginDataValidationMiddleware,
  signUpDataValidationMiddleware,
} from "../middlewares/userdata.validation";
const router = Router();

router.post("/signup", signUpDataValidationMiddleware, createuserController);
router.put("/update", signUpDataValidationMiddleware, updateuserController);

router.post("/login", loginDataValidationMiddleware, userAuthController);

export default router;
