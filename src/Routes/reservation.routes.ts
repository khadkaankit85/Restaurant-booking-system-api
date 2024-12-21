import { Router } from "express";
import {
  createReservationValidationMiddleware,
  deleteReservationValidationMiddleware,
  getReservationsByUserIDValidationMiddleware,
  updateReservationValidationMiddleware,
} from "../middlewares/reservation.middleware";
import {
  createReservationController,
  deleteReservationController,
  getReservationByIdController,
  updateReservationController,
} from "../controllers/reservation.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { updateDataValidationMiddleware } from "../middlewares/userdata.validation";

const router = Router();

router.get("/getAllReservations", verifyJWT(), (req, res) => {
  res.send("Get all reservations");
});

router.get(
  "/getReservationById/:id",
  verifyJWT(),
  deleteReservationValidationMiddleware,
  getReservationByIdController,
);

router.get(
  "/createReservation",
  verifyJWT(),
  createReservationValidationMiddleware,
  createReservationController,
);

router.post(
  "/updateReservation",
  verifyJWT(),
  updateReservationValidationMiddleware,
  updateReservationController,
);

router.delete(
  "/deleteReservation",
  verifyJWT(),
  deleteReservationValidationMiddleware,
  deleteReservationController,
);

router.get(
  "/getReservationOfUser",
  verifyJWT(),
  getReservationsByUserIDValidationMiddleware,
  getReservationByIdController,
);

export default router;
