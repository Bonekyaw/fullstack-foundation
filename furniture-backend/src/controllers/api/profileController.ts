import { Request, Response, NextFunction } from "express";
import { body, query, validationResult } from "express-validator";
import { errorCode } from "../../../config/errorCode";
import { authorise } from "../../utils/authorise";
import { getUserById } from "../../services/authService";
import { checkUserIfNotExist } from "../../utils/auth";
interface CustomRequest extends Request {
  userId?: number;
}

export const changeLanguage = [
  query("lng", "Invalid Language code.")
    .trim()
    .notEmpty()
    .matches("^[a-z]+$")
    .isLength({ min: 2, max: 3 }),
  (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    // If validation error occurs
    if (errors.length > 0) {
      const error: any = new Error(errors[0].msg);
      error.status = 400;
      error.code = errorCode.invalid;
      return next(error);
    }

    const { lng } = req.query;
    res.cookie("i18next", lng);
    res.status(200).json({ message: req.t("changeLan", { lang: lng }) });
  },
];

export const testPermission = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const user = await getUserById(userId!);
  checkUserIfNotExist(user);

  const info: any = {
    title: "Testing Permission",
  };
  // if user.role === "AUTHOR"
  // content = "You are an author."
  const can = authorise(true, user!.role, "AUTHOR");
  if (can) {
    info.content = "You have permission to read this line";
  }

  res.status(200).json({ info });
};
