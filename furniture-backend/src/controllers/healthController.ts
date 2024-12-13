import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  userId?: number;
}

export const healthCheck = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    message: "hello we are ready for sending response.",
    userId: req.userId,
  });
};
