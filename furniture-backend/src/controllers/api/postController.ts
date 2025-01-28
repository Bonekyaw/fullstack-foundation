import { Request, Response, NextFunction } from "express";
import { body, query, validationResult } from "express-validator";

import { errorCode } from "../../../config/errorCode";
import { checkUserIfNotExist } from "../../utils/auth";
import { checkUploadFile } from "../../utils/check";
import { createError } from "../../utils/error";

interface CustomRequest extends Request {
  user?: any;
}

export const getPost = [
  body("phone", "Invalid phone number")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 5, max: 12 }),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    // If validation error occurs
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const { phone, password, token } = req.body;
    res.status(200).json({ message: "OK" });
  },
];

export const getPostsByPagination = [
  body("phone", "Invalid phone number")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 5, max: 12 }),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    // If validation error occurs
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const { phone, password, token } = req.body;
    res.status(200).json({ message: "OK" });
  },
];
