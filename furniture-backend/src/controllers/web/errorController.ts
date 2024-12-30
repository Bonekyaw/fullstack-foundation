import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.render("404", { title: "404 Error", message: "Page Not Found" });
};
