import express from "express";

import { auth } from "../../middlewares/auth";
import { authorise } from "../../middlewares/authorise";
import { maintenance } from "../../middlewares/maintenance";
// import healthRoutes from "./health";
import authRoutes from "./auth";
import adminRoutes from "./admin";
import userRoutes from "./api";
// import viewRoutes from "./web/view";
// import * as errorController from "../../controllers/web/errorController";

const router = express.Router();

// router.use("/api/v1", healthRoutes);
// router.use(viewRoutes);

router.use("/api/v1", authRoutes);
router.use("/api/v1/user", userRoutes);
router.use("/api/v1/admins", auth, authorise(true, "ADMIN"), adminRoutes);

// router.use("/api/v1", maintenance, authRoutes);
// router.use("/api/v1/user", maintenance, userRoutes);
// router.use(
//   "/api/v1/admins",
//   maintenance,
//   auth,
//   authorise(true, "ADMIN"),
//   adminRoutes
// );

// app.use(errorController.notFound);

export default router;
