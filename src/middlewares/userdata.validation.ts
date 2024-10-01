import { Request,Response,NextFunction } from "express"
import { check, validationResult} from "express-validator"

// express validator chain for form data validation
export const signUpDataValidationMiddleware=[
 check("username").isString().withMessage("not a valid username").isLength({min:5,max:15}).withMessage("invalid lenght of username") ,
 (req:Request,res:Response,next:NextFunction)=>{
const error=validationResult(req)
    if(!error.isEmpty()){
        res.status(422).json({errors:error.array()});
    }
    next()
 }
]

export const loginDataValidationMiddleware=[]