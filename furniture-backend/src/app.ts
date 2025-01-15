import { FallbackLng } from "./../node_modules/i18next/typescript/options.d";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import path from "path";

import { limiter } from "./middlewares/rateLimiter";
import { auth } from "./middlewares/auth";
import { authorise } from "./middlewares/authorise";
// import healthRoutes from "./routes/v1/health";
import authRoutes from "./routes/v1/auth";
import adminRoutes from "./routes/v1/admin/user";
import profileRoutes from "./routes/v1/api/user";
// import viewRoutes from "./routes/v1/web/view";
// import * as errorController from "./controllers/web/errorController";

export const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");

var whitelist = ["http://example1.com", "http://localhost:5173"];
var corsOptions = {
  origin: function (
    origin: any,
    callback: (err: Error | null, origin?: any) => void
  ) {
    // Allow requests with no origin ( like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies or authorization header
};

app
  .use(morgan("dev"))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cookieParser())
  .use(cors(corsOptions))
  .use(helmet())
  .use(compression())
  .use(limiter);

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    backend: {
      loadPath: path.join(
        process.cwd(),
        "src/locales",
        "{{lng}}",
        "{{ns}}.json"
      ),
    },
    detection: {
      order: ["querystring", "cookie"],
      caches: ["cookie"],
    },
    fallbackLng: "en",
    preload: ["en", "mm"],
  });
app.use(middleware.handle(i18next));

app.use(express.static("public"));

// app.use("/api/v1", healthRoutes);
// app.use(viewRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1/admins", auth, authorise(true, "ADMIN"), adminRoutes);
app.use("/api/v1", profileRoutes);

// app.use(errorController.notFound);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "Server Error";
  const errorCode = error.code || "Error_Code";
  res.status(status).json({ message, error: errorCode });
});
