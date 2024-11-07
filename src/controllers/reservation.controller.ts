import {
  getAllReservations,
  getReservationById,
  updateReservation,
} from "../services/reservation.services";
import { Request, Response } from "express";

export const getAllReservationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const reservations = await getAllReservations();
    res.json(reservations);
  } catch {
    res.status(400).send("internal server error occurred");
  }
};

export const getReservationByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const reservation = await getReservationById(parseInt(req.params.id));
    res.json(reservation);
  } catch {
    res.status(400).send("internal server error occurred");
  }
};

export const createReservationController = async (
  req: Request,
  res: Response
) => {
  try {
    res.send("create reservation");
  } catch {
    res.status(400).send("internal server error occurred");
  }
};

export const updateReservationController = async (
  req: Request,
  res: Response
) => {
  try {
    const updatedReservation = await updateReservation(
      parseInt(req.params.id),
      req.body.reservation
    );
    res.send(updatedReservation);
  } catch {
    res.status(400).send("internal server error occurred");
  }
};

export const deleteReservationController = async (
  req: Request,
  res: Response
) => {
  try {
    res.send("delete reservation");
  } catch {
    res.status(400).send("internal server error occurred");
  }
};
