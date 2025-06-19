import request from "supertest";
import app from "../../app";
import { UserService } from "../../services/usersService";

// Automatically mock the whole service module
jest.mock("../../services/usersService");

beforeEach(async () => {
  jest.clearAllMocks();
});

describe("POST /users", () => {
  const userInput = { name: "Alice", email: "alice@gmail.com" };
  const createdUser = { id: "123", name: "Alice", email: "alice@gmail.com" };
  describe("Success path", () => {
    beforeEach(async () => {
      (UserService.create as jest.Mock).mockResolvedValue(createdUser);
    });
    test("should return 201 and the created user", async () => {
      const res = await request(app)
        .post("/users")
        .send(userInput)
        .set("Accept", "application/json");

      expect(res.status).toBe(201);
      expect(res.headers["content-type"]).toMatch(/json/);
      expect(res.body).toEqual(createdUser);

      expect(UserService.create).toHaveBeenCalledTimes(1);
      expect(UserService.create).toHaveBeenCalledWith(userInput);
    });
  });

  describe("Service error - DB error", () => {
    beforeEach(async () => {
      (UserService.create as jest.Mock).mockRejectedValue(new Error("DB Down"));
    });

    test("should return 500 with a generic error message", async () => {
      const res = await request(app)
        .post("/users")
        .send({ name: "Bob", email: "bob@gmail.com" })
        .set("Accept", "application/json");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "User creation failed" });
    });
  });

  describe("Validation error 400", () => {
    test("should return 400 when name is missing", async () => {
      const res = await request(app)
        .post("/users")
        .send({ email: "bob@gmail.com" })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "name is required");
      expect(UserService.create).not.toHaveBeenCalled();
    });

    test("should return 400 when email is missing", async () => {
      const res = await request(app)
        .post("/users")
        .send({ name: "Bob" })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "email is required");
      expect(UserService.create).not.toHaveBeenCalled();
    });

    test("should return 400 when email is invalid", async () => {
      const res = await request(app)
        .post("/users")
        .send({ name: "Bob", email: "bob@" })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "email is invalid");
      expect(UserService.create).not.toHaveBeenCalled();
    });
  });
});
