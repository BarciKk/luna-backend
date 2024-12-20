import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token is required", success: false });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token", success: false });
    }

    next();
  });
};
