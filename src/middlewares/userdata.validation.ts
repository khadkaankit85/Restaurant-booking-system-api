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

  check("phone")
    .optional()
    .isLength({ max: 10, min: 10 })
    .withMessage("Must be 10 in length"),

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

export const updateDataValidationMiddleware = [
  //array of  middleware to validate different data
  check("username")
    .isString()
    .withMessage("Invalid Username datatype")
    .isLength({ min: 5, max: 15 })
    .withMessage("Invalid username length"),

  check("password")
    .isLength({ min: 4 })
    .withMessage("Min length of password is 4"),
  check("email").optional().isEmail().withMessage("Must be a valid email"),

  check("phone")
    .optional()
    .isLength({ max: 10, min: 10 })
    .withMessage("Must be 10 in length"),

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

//array of middlewares to validate login request data
export const loginDataValidationMiddleware = [
  check("username")
    .isString()
    .withMessage("invalid username")
    .isLength({ min: 5, max: 15 })
    .withMessage("invalid username length")
    .trim(),

  check("password")
    .isString()
    .withMessage("Invalid password")
    .isLength({ min: 4 }),

  //to check for the validation result
  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ error: error.array() });
      return;
    }
    next();
  },
];

export const changePassValidationMiddleware = [
  check("username")
    .isString()
    .withMessage("invalid username")
    .isLength({ min: 5, max: 15 })
    .withMessage("invalid username length")
    .trim(),

  check("oldpassword")
    .isString()
    .withMessage("Invalid password")
    .isLength({ min: 4 }),

  check("newpassword")
    .isString()
    .withMessage("Invalid password")
    .isLength({ min: 4 }),

  //to check for the validation result
  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ error: error.array() });
      return;
    }
    next();
  },
];

export const changeUsernameValidationMiddleware = [
  check("oldUsername")
    .isString()
    .withMessage("Invalid Username datatype")
    .isLength({ min: 5, max: 15 })
    .withMessage("Invalid username length"),

  check("newUsername")
    .isString()
    .withMessage("Invalid Username datatype")
    .isLength({ min: 5, max: 15 })
    .withMessage("Invalid username length"),

  //to check for the validation result
  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ error: error.array() });
      return;
    }
    next();
  },
];

export const updateRoleValidationMiddleware = [
  check("username")
    .isString()
    .withMessage("Invalid Username datatype")
    .isLength({ min: 5, max: 15 })
    .withMessage("Invalid username length"),

  check("role")
    .isString()
    .withMessage("Invalid role datatype")
    .isLength({ min: 4, max: 5 })
    .withMessage("Invalid role length"),

  //to check for the validation result
  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ error: error.array() });
      return;
    }
    next();
  },
];
export const restaurantUpdateFormValidationMiddleware = [
  check("contactNumber")
    .isString()
    .withMessage("Invalid contact number datatype")
    .isLength({ min: 10, max: 15 })
    .withMessage("Invalid contact number length"),

  check("email").isEmail().withMessage("Must be a valid email"),

  check("restaurantName")
    .isString()
    .withMessage("Invalid restaurant name datatype")
    .isLength({ min: 3, max: 50 })
    .withMessage("Invalid restaurant name length"),

  //to check for the validation result
  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ errors: error.array() });
      return;
    }
    next();
  },
];
