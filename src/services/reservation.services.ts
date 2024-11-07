import { reservationType } from "../types/extras";
import { prisma } from "../prisma/prismaClient";

export const getAllReservations = async () => {
  const reservations = await prisma.reservation.findMany();
  return reservations;
};

export const getReservationById = async (id: number) => {
  const reservation = await prisma.reservation.findUnique({
    where: {
      id: id,
    },
  });
  return reservation;
};

export const createReservation = async (data: Omit<reservationType, "id">) => {
  const reservation = await prisma.reservation.create({
    data: {
      reservedById: data.reservedById,
      tableId: data.tableId,
      reservedItems: {
        create: data.reservedItems.map((item) => ({
          itemId: item.itemId,
          quantity: item.quantity,
        })),
      },
    },
  });
  return reservation;
};

export const deleteReservation = async (id: number) => {
  const reservation = await prisma.reservation.delete({
    where: {
      id: id,
    },
  });
  return reservation;
};

export const updateReservation = async (
  id: number,
  data: Omit<reservationType, "id">
) => {
  const reservation = await prisma.reservation.update({
    where: {
      id: id,
    },
    data: {
      reservedById: data.reservedById,
      tableId: data.tableId,
      reservedItems: {
        create: data.reservedItems.map((item) => ({
          itemId: item.itemId,
          quantity: item.quantity,
        })),
      },
    },
  });
  return reservation;
};

export const getReservationOfUser = async (userId: number) => {
  const reservations = await prisma.reservation.findMany({
    where: {
      reservedById: userId,
    },
  });
  return reservations;
};
