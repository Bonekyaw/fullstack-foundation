import { Request, Response, NextFunction } from "express";
import { isValidEmail } from "../utils/validator";
import { UserService } from "../services/usersService";

export async function createUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email } = req.body;

  if (!name) {
    res.status(400).json({ error: "name is required" });
    return;
  }

  if (!email) {
    res.status(400).json({ error: "email is required" });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).json({ error: "email is invalid" });
    return;
  }

  try {
    const user = await UserService.create({ name, email });
    res.status(201).json(user);
  } catch {
    res.status(500).json({ error: "User creation failed" });
  }
}
