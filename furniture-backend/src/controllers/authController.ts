import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { getUserByPhone, createOtp } from "../services/authServices";
import { checkUserExist } from "../utils/auth";
import { generateOTP, generateToken } from "../utils/generate";

export const register = [
  body("phone", "Invalid phone number")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 5, max: 12 }),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    // If validation error occurs
    if (errors.length > 0) {
      const error: any = new Error(errors[0].msg);
      error.status = 400;
      error.code = "Error_Invalid";
      return next(error);
    }

    let phone = req.body.phone;
    if (phone.slice(0, 2) === "09") {
      phone = phone.substring(2, phone.length);
    }

    const user = await getUserByPhone(phone);
    checkUserExist(user);

    // OTP sending logic here
    // Generate OTP & call OTP sending API
    // If sms OTP cannot be sent, response error
    // Save OTP to DB
    const otp = generateOTP();
    const token = generateToken();
    const otpData = {
      phone,
      otp: otp.toString(), // Hash this OTP before saving to DB
      rememberToken: token,
      count: 1,
    };
    const result = await createOtp(otpData);

    res.status(200).json({
      message: `We are sending OTP to 09${result.phone}`,
      phone: result.phone,
      token: result.rememberToken,
    });
  },
];

export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ message: "register" });
};

export const confirmPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ message: "register" });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ message: "register" });
};
