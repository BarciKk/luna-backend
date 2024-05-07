import { Router } from "express";
import {
  forgotPassword,
  resetPassword,
  userLogin,
  userRegister,
} from "./user/user.controller.js";

const authRouter = Router();

authRouter.post("/login", userLogin);
authRouter.post("/register", userRegister);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);

export { authRouter };
