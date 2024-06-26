import { Router } from "express";
import {
  forgotPasswordValidation,
  resetPasswordValidation,
  loginValidation,
  registerValidation,
} from "validations/auth.validation.js";
import { validateData } from "middleware/zod.middleware.js";
import { login, forgotPassword, resetPassword, register } from "auth/auth.controller";

const authRouter = Router();

authRouter.post("/login", validateData(loginValidation), login);
authRouter.post("/register", validateData(registerValidation), register);
authRouter.post("/forgot-password", validateData(forgotPasswordValidation), forgotPassword);
authRouter.post("/reset-password", validateData(resetPasswordValidation), resetPassword);

export { authRouter };
