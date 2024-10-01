import { Request,Response,NextFunction } from "express"
export const signUpDataValidationMiddleware=async(req:Request,res:Response,next:NextFunction)=>{
    console.log("validating signup data")
    next()
}

export const loginDataValidationMiddleware=async(req:Request,res:Response,next:NextFunction)=>{
    console.log("validating login data")
    next()
}