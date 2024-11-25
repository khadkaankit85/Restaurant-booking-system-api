import request from "supertest";
import app from "../../../src/app";
import signToken from "../../../src/Utils/jwt";
const userpayload = {
  UserInfo: { username: "khadkaankit", password: "123456pass", role: "user" },
};
const adminpayload = { UserInfo: { username: "adminUserId", role: "admin" } };

describe("User Routes", () => {
  let token: string;

  beforeAll(() => {
    token = signToken(userpayload);
  });

  describe("GET /restaurant-data", () => {
    it("should return restaurant data for authenticated user", async () => {
      const response = await request(app)
        .get("/user/restaurant-data")
        .set("authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
    });

    it("should return 401 for unauthenticated user", async () => {
      const response = await request(app).get("/restaurant-data");
      expect(response.status).toBe(401);
    });
  });

  describe("POST /signup", () => {
    it("should create a new user", async () => {
      const response = await request(app).post("/user/signup").send({
        username: "testuser",
        password: "password123",
        email: "emailaddress@gmail.com",
      });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("user");
    });
  });

  describe("PUT /update-data", () => {
    it("should update user data for authenticated user", async () => {
      const response = await request(app)
        .put("/update-data")
        .set("Authorization", `Bearer ${token}`)
        .send({ username: "updatedUser" });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("user");
    });

    it("should return 401 for unauthenticated user", async () => {
      const response = await request(app)
        .put("/update-data")
        .send({ username: "updatedUser" });
      expect(response.status).toBe(401);
    });
  });

  describe("PUT /change-password", () => {
    it("should change password for authenticated user", async () => {
      const response = await request(app)
        .put("/change-password")
        .set("Authorization", `Bearer ${token}`)
        .send({ oldPassword: "password123", newPassword: "newPassword123" });
      expect(response.status).toBe(200);
    });

    it("should return 401 for unauthenticated user", async () => {
      const response = await request(app)
        .put("/change-password")
        .send({ oldPassword: "password123", newPassword: "newPassword123" });
      expect(response.status).toBe(401);
    });
  });

  describe("PUT /change-username", () => {
    it("should change username for authenticated user", async () => {
      const response = await request(app)
        .put("/change-username")
        .set("Authorization", `Bearer ${token}`)
        .send({ newUsername: "newUsername" });
      expect(response.status).toBe(200);
    });

    it("should return 401 for unauthenticated user", async () => {
      const response = await request(app)
        .put("/change-username")
        .send({ newUsername: "newUsername" });
      expect(response.status).toBe(401);
    });
  });

  describe("PUT /upate-role", () => {
    it("should update user role for admin user", async () => {
      const adminToken = signToken(adminpayload);
      const response = await request(app)
        .put("/upate-role")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ userId: "testUserId", newRole: "admin" });
      expect(response.status).toBe(200);
    });

    it("should return 403 for non-admin user", async () => {
      const response = await request(app)
        .put("/upate-role")
        .set("Authorization", `Bearer ${token}`)
        .send({ userId: "testUserId", newRole: "admin" });
      expect(response.status).toBe(403);
    });
  });

  describe("PUT /update-restaurant", () => {
    it("should update restaurant details for admin user", async () => {
      const adminToken = signToken(adminpayload);
      const response = await request(app)
        .put("/update-restaurant")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ name: "New Restaurant Name" });
      expect(response.status).toBe(200);
    });

    it("should return 403 for non-admin user", async () => {
      const response = await request(app)
        .put("/update-restaurant")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "New Restaurant Name" });
      expect(response.status).toBe(403);
    });
  });

  describe("DELETE /remove-user", () => {
    it("should delete user for authenticated user", async () => {
      const response = await request(app)
        .delete("/remove-user")
        .set("Authorization", `Bearer ${token}`)
        .send({ userId: "testUserId" });
      expect(response.status).toBe(200);
    });

    it("should return 401 for unauthenticated user", async () => {
      const response = await request(app)
        .delete("/remove-user")
        .send({ userId: "testUserId" });
      expect(response.status).toBe(401);
    });
  });

  describe("POST /login", () => {
    it("should login user with valid credentials", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "testuser", password: "password123" });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("should return 401 for invalid credentials", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "testuser", password: "wrongpassword" });
      expect(response.status).toBe(401);
    });
  });

  describe("GET /refresh", () => {
    it("should refresh token", async () => {
      const response = await request(app).get("/refresh");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });
  });

  describe("POST /logout", () => {
    it("should logout user", async () => {
      const response = await request(app).post("/logout");
      expect(response.status).toBe(200);
    });
  });
});
