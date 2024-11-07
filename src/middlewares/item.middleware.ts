import { check, validationResult } from "express-validator";
import { Request, Response } from "express";

export const deleteItemValidationMiddleware = [
  check("id").isNumeric(),
  (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ errors: errors.array() });
  },
];

export const updateItemValidationMiddleware = [
  check("id").isNumeric(),
  check("name").isString(),
  check("price").isNumeric(),
  check("description").isString(),
  check("image").isString(),
  (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ errors: errors.array() });
  },
];

export const getItemByIdValidationMiddleware = [
  check("id").isNumeric(),
  (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ errors: errors.array() });
  },
];

export const createItemValidationMiddleware = [
  check("name").isString(),
  check("price").isNumeric(),
  check("description").isString(),
  check("image").isString(),
  (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ errors: errors.array() });
  },
];
