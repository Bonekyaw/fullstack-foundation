import express from "express";
import {
  changeLanguage,
  testPermission,
  uploadProfile,
  testRestrictedAccess,
} from "../../../controllers/api/profileController";
import { auth } from "../../../middlewares/auth";
import upload from "../../../middlewares/uploadFile";

const router = express.Router();

router.post("/change-language", changeLanguage);
router.get("/test-permission", auth, testPermission);

router.patch("/profile/upload", auth, upload.single("avatar"), uploadProfile);

router.get("/profile/my-photo", testRestrictedAccess);
export default router;
