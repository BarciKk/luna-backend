import { Router } from "express";
import {
  resetPasswordPin,
  userLogin,
  userRegister,
} from "./user.controller.js";
const authRouter = Router();

authRouter.post("/login", userLogin);
authRouter.post("/register", userRegister);
authRouter.post("/reset-password", resetPasswordPin);
export { authRouter };
