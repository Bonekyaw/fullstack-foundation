import { Request, Response, NextFunction } from "express";
import { getUserById } from "../services/authService";
import { errorCode } from "../../config/errorCode";

interface CustomRequest extends Request {
  userId?: number;
  user?: any;
}
// authorise(true, "ADMIN", "AUTHOR") // deny - "USER"
// authorise(false, "USER") // allow - "ADMIN", "AUTHOR"

export const authorise = (permission: boolean, ...roles: string[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const user = await getUserById(userId!);
    if (!user) {
      const err: any = new Error("This account has not registered!");
      err.status = 401;
      err.code = errorCode.unauthenticated;
      return next(err);
    }

    const result = roles.includes(user.role);

    // permission && result

    if (permission && !result) {
      const err: any = new Error("This action is not allowed.");
      err.status = 403;
      err.code = errorCode.unauthorised;
      return next(err);
    }

    if (!permission && result) {
      const err: any = new Error("This action is not allowed.");
      err.status = 403;
      err.code = errorCode.unauthorised;
      return next(err);
    }

    req.user = user;
    next();
  };
};
