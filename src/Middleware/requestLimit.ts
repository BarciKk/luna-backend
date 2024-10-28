import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1,
  message: "You can only request a password reset once every 10 minutes.",
});
const applyRequestLimit = (req: Request, res: Response, next: () => void) => {
  limiter(req, res, next);
};

export { applyRequestLimit };
