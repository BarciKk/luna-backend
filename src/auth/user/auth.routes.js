import { Router } from "express";
import {
  resetPasswordPin,
  userLogin,
  userRegister,
  verifyOTPCode,
} from "./user.controller.js";
const authRouter = Router();

authRouter.post("/login", userLogin);
authRouter.post("/register", userRegister);
authRouter.post("/reset-password", resetPasswordPin);
authRouter.post("/reset-password/otp", verifyOTPCode);
export { authRouter };
