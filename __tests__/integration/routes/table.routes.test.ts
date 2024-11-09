import request from "supertest";
import app from "../../../src/app";
import {
  getAllTables,
  getTableStatus,
} from "../../../src/services/table.service";
import { verifyJWT } from "../../../src/middlewares/auth.middleware";

jest.mock("../../../src/services/table.service");
jest.mock("../../../src/middlewares/auth.middleware");

describe("Table Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /getTables", () => {
    it("should return all tables", async () => {
      const mockTables = [
        { id: 1, name: "Table 1" },
        { id: 2, name: "Table 2" },
      ];
      (getAllTables as jest.Mock).mockResolvedValue(mockTables);
      (verifyJWT as jest.Mock).mockImplementation((req, res, next) => next());

      const response = await request(app).get("/getTables");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTables);
      expect(getAllTables).toHaveBeenCalledTimes(1);
    });

    it("should handle errors", async () => {
      (getAllTables as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );
      (verifyJWT as jest.Mock).mockImplementation((req, res, next) => next());

      const response = await request(app).get("/getTables");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Database error" });
    });
  });

  describe("GET /tablestatus", () => {
    it("should return table status", async () => {
      const mockTableStatus = { id: 1, status: "available" };
      (getTableStatus as jest.Mock).mockResolvedValue(mockTableStatus);
      (verifyJWT as jest.Mock).mockImplementation((req, res, next) => next());

      const response = await request(app)
        .get("/tablestatus")
        .query({ tableID: "1" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTableStatus);
      expect(getTableStatus).toHaveBeenCalledWith(1);
    });

    it("should return 400 if tableID is not provided", async () => {
      (verifyJWT as jest.Mock).mockImplementation((req, res, next) => next());

      const response = await request(app).get("/tablestatus");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Table ID not provided" });
    });

    it("should handle errors", async () => {
      (getTableStatus as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );
      (verifyJWT as jest.Mock).mockImplementation((req, res, next) => next());

      const response = await request(app)
        .get("/tablestatus")
        .query({ tableID: "1" });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Database error" });
    });
  });

  describe("POST /bookTable", () => {
    it("should book a table", async () => {
      (verifyJWT as jest.Mock).mockImplementation((req, res, next) => next());

      const response = await request(app)
        .post("/bookTable")
        .send({ tableID: "1" });

      // Add assertions based on the actual implementation of booking logic
      expect(response.status).toBe(200);
    });

    // Add more tests for booking logic as needed
  });
});
