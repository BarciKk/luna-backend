import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from "Auth/auth.controller";
import { Router } from "express";
import { applyRequestLimit } from "Middleware/requestLimit";
import { validateData } from "Middleware/validateData";
import {
  loginSchema,
  registerSchema,
  updatePasswordSchema,
  resetPasswordEmailSchema,
} from "validation/auth.validation";

const authRoutes = Router();

authRoutes.post("/register", validateData(registerSchema), register);
authRoutes.post("/login", validateData(loginSchema), login);
authRoutes.post(
  "/forgot-password",
  applyRequestLimit,
  validateData(resetPasswordEmailSchema),
  forgotPassword
);
authRoutes.post(
  "/reset-password",
  validateData(updatePasswordSchema),
  resetPassword
);

export { authRoutes };
