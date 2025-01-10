import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  userId?: number;
}

export const getAllUsers = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const id = req.userId;

  res.status(200).json({
    message: "All Users.",
    currentUserId: id,
  });
};
