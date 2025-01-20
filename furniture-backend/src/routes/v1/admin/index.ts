import express from "express";

import { getAllUsers } from "../../../controllers/admin/userController";
import { setMaintenance } from "../../../controllers/admin/systemController";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/maintenance", setMaintenance);
export default router;
