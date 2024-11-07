import { Router } from "express";
import {
  createReservationValidationMiddleware,
  deleteReservationValidationMiddleware,
} from "../middlewares/reservation.middleware";
import { getReservationById } from "../services/reservation.services";
import { create } from "domain";
import {
  createReservationController,
  deleteReservationController,
  getReservationByIdController,
  updateReservationController,
} from "../controllers/reservation.controller";
import { updateDataValidationMiddleware } from "../middlewares/userdata.validation";

const router = Router();

router.get("/getAllReservations", (req, res) => {
  res.send("Get all reservations");
});

router.get(
  "/getReservationById/:id",
  deleteReservationValidationMiddleware,
  getReservationByIdController
);

router.get(
  "/createReservation",
  createReservationValidationMiddleware,
  createReservationController
);

router.post(
  "/updateReservation",
  updateDataValidationMiddleware,
  updateReservationController
);

export default router;
