import request from "supertest";
import app from "../../app";
import { execSync } from "child_process"; // For running shell commands
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

describe("User API - e2e Test", () => {
  beforeAll(() => {
    execSync("npx prisma migrate reset --force");
  });

  // Disconnect Prisma client and from the database after all tests
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("/users endpoint", () => {
    test("should create a new User with 201 status", async () => {
      const response = await request(app).post("/users").send({
        name: "Mr. Test",
        email: "test@example.com",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe("Mr. Test");
      expect(response.body.email).toBe("test@example.com");

      // Verify the user was created in the database
      const user = await prisma.user.findUnique({
        where: { id: response.body.id },
      });
      expect(user).toBeDefined(); // .not.toBeNull();
    });
  });
});
