import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

// array of validator middlewares:)
export const signUpDataValidationMiddleware = [
  //array of  middleware to validate different data
  check("username")
    .isString()
    .withMessage("Invalid Username datatype")
    .isLength({ min: 5, max: 15 })
    .withMessage("Invalid username length"),

  check("password")
    .isLength({ min: 4 })
    .withMessage("Min length of password is 4"),
  check("email").isEmail().withMessage("Must be a valid email"),

  check("phone").optional().isLength({max:10,min:10}).withMessage("Must be 10 in length"),

  //second middleware to check for the result of the query of previous validations:)
  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(422).json({ errors: error.array() });
      return;
    }
    next();
  },
];

export const loginDataValidationMiddleware = [];
