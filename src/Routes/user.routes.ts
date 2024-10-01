import { Router } from "express";
import { createuserController, loginuserController } from "../controllers/user.controller";
import { loginDataValidationMiddleware, signUpDataValidationMiddleware } from "../middlewares/userdata.validation";
const router = Router()

router.post("/signup", signUpDataValidationMiddleware,createuserController)
router.post("/login", loginDataValidationMiddleware,loginuserController)

export default router