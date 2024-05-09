import { Router } from "express";
import {
  forgotPassword,
  resetPassword,
  login,
  register,
} from "./user/auth.controller.js";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);

export { authRouter };
