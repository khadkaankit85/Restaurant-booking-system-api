import request from "supertest";
import { Express } from "express";
import { PrismaClient } from "@prisma/client";
import app from "../../../src/app";

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
  app.listen();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Items Routes", () => {
  let token: string;

  beforeAll(async () => {
    //to obtain token
    const response = await request(app)
      .post("/user/login")
      .send({ username: "hello", password: "testing" });
    token = response.body.token;
  });

  describe("POST /items", () => {
    it("should create a new item", async () => {
      const newItem = {
        name: "New Item",
        price: 10.99,
        description: "A new item description",
        image: "linktotheimage",
      };
      const response = await request(app)
        .post("/items")
        .set("Authorization", `Bearer ${token}`)
        .send(newItem);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toMatchObject(newItem);
    });

    it("should return 400 for invalid data", async () => {
      const invalidItem = {
        name: "",
        price: -10,
      };
      const response = await request(app)
        .post("/items")
        .set("Authorization", `Bearer ${token}`)
        .send(invalidItem);
      expect(response.status).toBe(400);
    });
  });

  describe("PUT /items/:id", () => {
    it("should update an existing item", async () => {
      const itemId = "someItemId"; // Replace with a valid item ID
      const updatedItem = {
        name: "Updated Item",
        price: 15.99,
        description: "An updated item description",
        image: "newimglink",
      };
      const response = await request(app)
        .put(`/items/${itemId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedItem);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updatedItem);
    });

    it("should return 400 for invalid data", async () => {
      const itemId = "someItemId"; // Replace with a valid item ID
      const invalidItem = {
        name: "",
        price: -10,
      };
      const response = await request(app)
        .put(`/items/${itemId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(invalidItem);
      expect(response.status).toBe(400);
    });

    it("should return 404 if item not found", async () => {
      const invalidItemId = "invalidItemId";
      const updatedItem = {
        name: "Updated Item",
        price: 15.99,
        description: "An updated item description",
      };
      const response = await request(app)
        .put(`/items/${invalidItemId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedItem);
      expect(response.status).toBe(404);
    });
  });
});
