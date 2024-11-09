import request from "supertest";
import app from "../../../src/app";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";

config();

const token = sign(
  {
    UserInfo: {
      username: "khadaankit",
      role: "user",
    },
  },
  process.env.JWT_ACCESS_TOKEN_SECRET as string,
  {
    expiresIn: "1h",
  }
);

describe("Reservation Routes", () => {
  it("should get all reservations", async () => {
    const response = await request(app)
      .get("/reservation/getAllReservations")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.text).toBe("Get all reservations");
  });

  it("should get reservation by id", async () => {
    const response = await request(app)
      .get("/reservation/getReservationById/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    // Add more assertions based on the actual response
  });

  it("should create a reservation", async () => {
    const response = await request(app)
      .get("/reservation/createReservation")
      .set("Authorization", `Bearer ${token}`)
      .send({
        reservation: {
          reservedById: 123,
          tableId: 45,
          reservedItems: [
            {
              itemId: 1,
              quantity: 2,
            },
            {
              itemId: 2,
              quantity: 1,
            },
          ],
        },
      });

    expect(response.status).toBe(200);
    // Add more assertions based on the actual response
  });

  it("should update a reservation", async () => {
    const response = await request(app)
      .post("/reservation/updateReservation")
      .set("Authorization", `Bearer ${token}`)
      .send({
        reservation: {
          reservedById: 123,
          tableId: 45,
          reservedItems: [
            {
              itemId: 1,
              quantity: 3,
            },
            {
              itemId: 2,
              quantity: 1,
            },
          ],
        },
      });

    expect(response.status).toBe(200);
    console.log(response.body);
  });

  it("should delete a reservation", async () => {
    const response = await request(app)
      .delete("/reservation/deleteReservation")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: 123,
      });

    expect(response.status).toBe(200);
    // Add more assertions based on the actual response
  });

  it("should get reservations of a user", async () => {
    const response = await request(app)
      .get("/reservation/getReservationOfUser")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    // Add more assertions based on the actual response
  });
});
