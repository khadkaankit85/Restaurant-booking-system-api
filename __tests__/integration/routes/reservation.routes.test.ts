import request from "supertest";
import app from "../../../src/app";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";

config();

const token = sign({ id: "testUserId" }, process.env.JWT_SECRET!, {
  expiresIn: "1h",
});

describe("Reservation Routes", () => {
  it("should get all reservations", async () => {
    const response = await request(app)
      .get("/getAllReservations")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.text).toBe("Get all reservations");
  });

  it("should get reservation by id", async () => {
    const response = await request(app)
      .get("/getReservationById/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    // Add more assertions based on the actual response
  });

  it("should create a reservation", async () => {
    const response = await request(app)
      .get("/createReservation")
      .set("Authorization", `Bearer ${token}`)
      .send({
        // Add necessary payload for creating a reservation
      });

    expect(response.status).toBe(200);
    // Add more assertions based on the actual response
  });

  it("should update a reservation", async () => {
    const response = await request(app)
      .post("/updateReservation")
      .set("Authorization", `Bearer ${token}`)
      .send({
        // Add necessary payload for updating a reservation
      });

    expect(response.status).toBe(200);
    // Add more assertions based on the actual response
  });

  it("should delete a reservation", async () => {
    const response = await request(app)
      .delete("/deleteReservation")
      .set("Authorization", `Bearer ${token}`)
      .send({
        // Add necessary payload for deleting a reservation
      });

    expect(response.status).toBe(200);
    // Add more assertions based on the actual response
  });

  it("should get reservations of a user", async () => {
    const response = await request(app)
      .get("/getReservationOfUser")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    // Add more assertions based on the actual response
  });
});
