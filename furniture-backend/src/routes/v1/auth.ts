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
} from "../../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/confirm-password", confirmPassword);
router.post("/login", login);
router.post("/logout", logout);

router.post("/forget-password", forgetPassword);
router.post("/verify", verifyOtpForPassword);
router.post("/reset-password", resetPassword);

export default router;
