import express from "express";
import { createUserHandler } from "./controllers/usersController";

const app = express();
app.use(express.json());

app.post("/users", createUserHandler);

export default app;
