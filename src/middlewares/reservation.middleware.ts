import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const createReservationValidationMiddleware: RequestHandler[] = [
  check("reservation").isObject().withMessage("Reservation must be an object"),

  check("reservation.reservedById")
    .isNumeric()
    .withMessage("ReservedById must be a number"),

  check("reservation.tableId")
    .isNumeric()
    .withMessage("TableId must be a number"),

  check("reservation.reservedItems")
    .isArray()
    .withMessage("ReservedItems must be an array"),

  check("reservation.reservedItems.*.itemId")
    .isNumeric()
    .withMessage("ItemId must be a number"),

  check("reservation.reservedItems.*.quantity")
    .isNumeric()
    .withMessage("Quantity must be a number"),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

export const updateReservationValidationMiddleware = [
  check("reservation").isObject().withMessage("Reservation must be an object"),
  check("reservation.reservedById")
    .isNumeric()
    .withMessage("ReservedById must be a number"),
  check("reservation.tableId")
    .isNumeric()
    .withMessage("TableId must be a number"),
  check("reservation.reservedItems")
    .isArray()
    .withMessage("ReservedItems must be an array"),
  check("reservation.reservedItems.*.itemId")
    .isNumeric()
    .withMessage("ItemId must be a number"),
  check("reservation.reservedItems.*.quantity")
    .isNumeric()
    .withMessage("Quantity must be a number"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const deleteReservationValidationMiddleware = [
  check("id").isNumeric().withMessage("Id must be a number"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];
