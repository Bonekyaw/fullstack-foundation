import request from "supertest";
import app from "../../app";
import { UserService } from "../../services/usersService";

// Automatically mock the whole service module
jest.mock("../../services/usersService");

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
});
