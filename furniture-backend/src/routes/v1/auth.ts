import express from "express";
import {
  register,
  verifyOtp,
  confirmPassword,
  login,
  logout,
  forgetPassword,
  verifyOtpForPassword,
  resetPassword,
  authCheck,
} from "../../controllers/authController";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/confirm-password", confirmPassword);
router.post("/login", login);
router.post("/logout", logout);

router.post("/forget-password", forgetPassword);
router.post("/verify", verifyOtpForPassword);
router.post("/reset-password", resetPassword);

router.get("/auth-check", auth, authCheck);

export default router;
