import express, { Request, Response } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";

import { limiter } from "./middlewares/rateLimiter";
import { check } from "./middlewares/check";

export const app = express();

app
  .use(morgan("dev"))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cors())
  .use(helmet())
  .use(compression())
  .use(limiter);

interface CustomRequest extends Request {
  userId?: number;
}

// http://localhost:8080/health
app.get("/health", check, (req: CustomRequest, res: Response) => {
  res.status(200).json({
    message: "hello we are ready for sending response.",
    userId: req.userId,
  });
});
