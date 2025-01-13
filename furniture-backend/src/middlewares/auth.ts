import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorCode } from "../../config/errorCode";
import { getUserById, updateUser } from "../services/authService";

interface CustomRequest extends Request {
  userId?: number;
}

export const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  // const platform = req.headers["x-platform"];
  // if (platform === "mobile") {
  //   const accessTokenMobile = req.headers.authorization?.split(" ")[1];
  //   console.log("Request from Mobile", accessTokenMobile);
  // } else {
  //   console.log("Request from Web");
  // }
  const accessToken = req.cookies ? req.cookies.accessToken : null;
  const refreshToken = req.cookies ? req.cookies.refreshToken : null;

  if (!refreshToken) {
    const err: any = new Error("You are not an authenticated user.");
    err.status = 401;
    err.code = errorCode.unauthenticated;
    return next(err);
  }

  const generateNewTokens = async () => {
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as {
        id: number;
        phone: string;
      };
    } catch (error) {
      const err: any = new Error("You are not an authenticated user.");
      err.status = 401;
      err.code = errorCode.unauthenticated;
      return next(err);
    }

    const user = await getUserById(decoded.id);
    if (!user) {
      const err: any = new Error("This account has not registered!.");
      err.status = 401;
      err.code = errorCode.unauthenticated;
      return next(err);
    }

    if (user.phone !== decoded.phone) {
      const err: any = new Error("You are not an authenticated user.");
      err.status = 401;
      err.code = errorCode.unauthenticated;
      return next(err);
    }

    if (user.randToken !== refreshToken) {
      const err: any = new Error("You are not an authenticated user.");
      err.status = 401;
      err.code = errorCode.unauthenticated;
      return next(err);
    }

    // Authorization token
    const accessTokenPayload = { id: user.id };
    const refreshTokenPayload = { id: user.id, phone: user.phone };

    const newAccessToken = jwt.sign(
      accessTokenPayload,
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: 60 * 2, // 2 min in dev but 5 or 15 min in production
      }
    );

    const newRefreshToken = jwt.sign(
      refreshTokenPayload,
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "30d",
      }
    );

    const userData = {
      randToken: newRefreshToken,
    };

    await updateUser(user.id, userData);

    res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

    req.userId = user.id;
    next();
  };

  if (!accessToken) {
    generateNewTokens();
    // const err: any = new Error("Access Token has expired.");
    // err.status = 401;
    // err.code = errorCode.accessTokenExpired;
    // return next(err);
  } else {
    // Verify access Token
    let decoded;
    try {
      decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as {
        id: number;
      };
      req.userId = decoded.id;

      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        generateNewTokens();
        // error.message = "Access Token has expired.";
        // error.status = 401;
        // error.code = errorCode.accessTokenExpired;
      } else {
        error.message = "Acess Token is invalid.";
        error.status = 400;
        error.code = errorCode.attack;
        return next(error);
      }
    }
  }
};
