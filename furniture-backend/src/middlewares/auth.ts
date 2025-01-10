import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  userId?: number;
}

export const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const accessToken = req.cookies ? req.cookies.accessToken : null;
  const refreshToken = req.cookies ? req.cookies.refreshToken : null;

  if (!refreshToken) {
    const err: any = new Error("You are not an authenticated user.");
    err.status = 401;
    err.code = "Error_Unauthenticated";
    return next(err);
  }

  if (!accessToken) {
    const err: any = new Error("Access Token has expired.");
    err.status = 401;
    err.code = "Error_AccessTokenExpired";
    return next(err);
  }

  // Verify access Token
  let decoded;
  try {
    decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as {
      id: number;
    };
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      error.message = "Access Token has expired.";
      error.status = 401;
      error.code = "Error_AccessTokenExpired";
    } else {
      error.message = "Acess Token is invalid.";
      error.status = 400;
      error.code = "Error_Attack";
    }
    return next(error);
  }

  req.userId = decoded.id;

  next();
};
