import request from "supertest";
import {
  createuser,
  deleteUser,
  finduserWithUsername,
  updatePassword,
  updateUsername,
  updateRole,
  updateRestaurantDetail,
  getRestaurantDetail,
} from "../../../src/services/user.services";
import { encryptPass, comparePass } from "../../../src/Utils/EncryptPw";
import app from "../../../src/app";

jest.mock("../../../src/services/user.services");
jest.mock("../../../src/Utils/EncryptPw");

describe("User Controller", () => {
  describe("authUserWithPassword", () => {
    it("should return user if authentication is successful", async () => {
      const mockUser = { username: "testuser", password: "hashedpassword" };
      (finduserWithUsername as jest.Mock).mockResolvedValue(mockUser);
      (comparePass as jest.Mock).mockResolvedValue(true);

      const response = await request(app)
        .post("/auth")
        .send({ username: "testuser", password: "password" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
    });

    it("should return 401 if user is not found", async () => {
      (finduserWithUsername as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post("/auth")
        .send({ username: "nonexistentuser", password: "password" });

      expect(response.status).toBe(401);
      expect(response.text).toBe("user not found");
    });

    it("should return 401 if password is invalid", async () => {
      const mockUser = { username: "testuser", password: "hashedpassword" };
      (finduserWithUsername as jest.Mock).mockResolvedValue(mockUser);
      (comparePass as jest.Mock).mockResolvedValue(false);

      const response = await request(app)
        .post("/auth")
        .send({ username: "testuser", password: "wrongpassword" });

      expect(response.status).toBe(401);
      expect(response.text).toBe("Invalid password");
    });
  });

  describe("createuserController", () => {
    it("should create a new user if username is not taken", async () => {
      (finduserWithUsername as jest.Mock).mockResolvedValue(null);
      (encryptPass as jest.Mock).mockResolvedValue("hashedpassword");
      (createuser as jest.Mock).mockResolvedValue({});

      const response = await request(app)
        .post("/users")
        .send({
          username: "newuser",
          password: "password",
          email: "email@example.com",
          phone: "1234567890",
        });

      expect(response.status).toBe(201);
      expect(response.text).toBe("User created successfully");
    });

    it("should return 409 if username is already taken", async () => {
      const mockUser = { username: "existinguser" };
      (finduserWithUsername as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post("/users")
        .send({
          username: "existinguser",
          password: "password",
          email: "email@example.com",
          phone: "1234567890",
        });

      expect(response.status).toBe(409);
      expect(response.text).toBe("Username already taken");
    });
  });

  describe("changePasswordController", () => {
    it("should change the password if authentication is successful", async () => {
      const mockUser = { username: "testuser", password: "hashedpassword" };
      (finduserWithUsername as jest.Mock).mockResolvedValue(mockUser);
      (comparePass as jest.Mock).mockResolvedValue(true);
      (encryptPass as jest.Mock).mockResolvedValue("newhashedpassword");

      const response = await request(app)
        .post("/users/change-password")
        .send({
          username: "testuser",
          oldpassword: "password",
          newpassword: "newpassword",
        });

      expect(response.status).toBe(200);
      expect(response.text).toBe("password changed successfully");
    });

    it("should return 400 if authentication fails", async () => {
      (finduserWithUsername as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post("/users/change-password")
        .send({
          username: "nonexistentuser",
          oldpassword: "password",
          newpassword: "newpassword",
        });

      expect(response.status).toBe(400);
      expect(response.text).toBe("Data validation error occurred");
    });
  });

  describe("changeUsernameController", () => {
    it("should change the username if new username is not taken", async () => {
      (finduserWithUsername as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post("/users/change-username")
        .send({ oldUsername: "olduser", newUsername: "newuser" });

      expect(response.status).toBe(200);
      expect(response.text).toBe("Usename updated from olduser to newuser");
    });

    it("should return 400 if new username is already taken", async () => {
      const mockUser = { username: "newuser" };
      (finduserWithUsername as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post("/users/change-username")
        .send({ oldUsername: "olduser", newUsername: "newuser" });

      expect(response.status).toBe(400);
      expect(response.text).toBe("Username alreaday taken");
    });
  });

  describe("deleteUserController", () => {
    it("should delete the user if authentication is successful", async () => {
      (encryptPass as jest.Mock).mockResolvedValue("hashedpassword");
      (deleteUser as jest.Mock).mockResolvedValue({});

      const response = await request(app)
        .delete("/users")
        .send({ username: "testuser", password: "password" });

      expect(response.status).toBe(200);
      expect(response.text).toBe("user deleted");
    });

    it("should return 400 if an error occurs", async () => {
      (encryptPass as jest.Mock).mockRejectedValue(
        new Error("Encryption error")
      );

      const response = await request(app)
        .delete("/users")
        .send({ username: "testuser", password: "password" });

      expect(response.status).toBe(400);
      expect(response.text).toBe("Unexpected error occrred");
    });
  });

  describe("updateUserroleController", () => {
    it("should update the user role if role is valid", async () => {
      (updateRole as jest.Mock).mockResolvedValue({});

      const response = await request(app)
        .put("/users/role")
        .send({ username: "testuser", role: "admin" });

      expect(response.status).toBe(200);
      expect(response.text).toBe("role updated to admin");
    });

    it("should return 400 if role is invalid", async () => {
      const response = await request(app)
        .put("/users/role")
        .send({ username: "testuser", role: "invalidrole" });

      expect(response.status).toBe(400);
      expect(response.text).toBe("invalid role request");
    });
  });

  describe("updateRestaurantDetailController", () => {
    it("should update restaurant details", async () => {
      (updateRestaurantDetail as jest.Mock).mockResolvedValue({});

      const response = await request(app)
        .put("/restaurant")
        .send({
          newDetail: { name: "New Restaurant", address: "New Address" },
        });

      expect(response.status).toBe(200);
      expect(response.text).toBe("updated resturant detail");
    });

    it("should return 500 if an error occurs", async () => {
      (updateRestaurantDetail as jest.Mock).mockRejectedValue(
        new Error("Update error")
      );

      const response = await request(app)
        .put("/restaurant")
        .send({
          newDetail: { name: "New Restaurant", address: "New Address" },
        });

      expect(response.status).toBe(500);
      expect(response.text).toBe("internal server error occurred");
    });
  });

  describe("getRestaurantDataController", () => {
    it("should return restaurant details", async () => {
      const mockRestaurant = {
        name: "Test Restaurant",
        address: "Test Address",
      };
      (getRestaurantDetail as jest.Mock).mockResolvedValue(mockRestaurant);

      const response = await request(app).get("/restaurant");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockRestaurant);
    });

    it("should return 400 if an error occurs", async () => {
      (getRestaurantDetail as jest.Mock).mockRejectedValue(
        new Error("Fetch error")
      );

      const response = await request(app).get("/restaurant");

      expect(response.status).toBe(400);
      expect(response.text).toBe("internal server error occurred");
    });
  });
});
