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
    // Assuming there's a route to login and get a token
    const response = await request(app)
      .post("/auth/login")
      .send({ username: "testuser", password: "testpassword" });
    token = response.body.token;
  });

  describe("GET /items", () => {
    it("should return a list of items", async () => {
      const response = await request(app)
        .get("/items")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /items/:id", () => {
    it("should return a single item by ID", async () => {
      const itemId = "someItemId"; // Replace with a valid item ID
      const response = await request(app)
        .get(`/items/${itemId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", itemId);
    });

    it("should return 404 if item not found", async () => {
      const invalidItemId = "invalidItemId";
      const response = await request(app)
        .get(`/items/${invalidItemId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(404);
    });
  });

  describe("POST /items", () => {
    it("should create a new item", async () => {
      const newItem = {
        name: "New Item",
        price: 10.99,
        description: "A new item description",
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
