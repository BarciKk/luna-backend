import { Router } from "express";
import { forgotPassword, resetPassword, login, register } from "./user/auth.controller.js";
import { validateData } from "../middleware/zod.middleware.js";
import {
  forgotPasswordValidation,
  resetPasswordValidation,
  loginValidation,
  registerValidation,
} from "../validations/auth.validation.js";

const authRouter = Router();

authRouter.post("/login", validateData(loginValidation), login);
authRouter.post("/register", validateData(registerValidation), register);
authRouter.post("/forgot-password", validateData(forgotPasswordValidation), forgotPassword);
authRouter.post("/reset-password", validateData(resetPasswordValidation), resetPassword);

export { authRouter };
