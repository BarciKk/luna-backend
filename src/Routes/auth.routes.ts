import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from "Auth/auth.controller";
import { Router } from "express";
import { applyRequestLimit } from "Middleware/requestLimit";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/forgot-password", applyRequestLimit, forgotPassword);
authRoutes.post("/reset-password", resetPassword);

export { authRoutes };
