import { Router } from "express";
import { createuserController } from "../controllers/user.controller";
// import 
const router = Router()

router.post("/signup",signUpDataValidationMiddleware,createuserController)
// router.post("/login",loginDataValidationMiddleware,loginuserController)

export default router