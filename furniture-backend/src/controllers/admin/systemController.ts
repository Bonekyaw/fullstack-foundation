import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

import { errorCode } from "../../../config/errorCode";
import { createError } from "../../utils/error";
import { createOrUpdateSettingStatus } from "../../services/settingService";

interface CustomRequest extends Request {
  user?: any;
}

export const setMaintenance = [
  body("mode", "Mode must be boolean.").isBoolean(),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    // If validation error occurs
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    // const user = req.user;
    const { mode } = req.body;
    const value = mode ? "true" : "false";
    const message = mode
      ? "Successfully set Maintenance mode."
      : "Successfully turn off Maintenance mode";
    await createOrUpdateSettingStatus("maintenance", value);
    res.status(200).json({ message });
  },
];
