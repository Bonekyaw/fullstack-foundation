import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  userId?: number;
}
export const check = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  req.userId = 12345;
  next();
};
