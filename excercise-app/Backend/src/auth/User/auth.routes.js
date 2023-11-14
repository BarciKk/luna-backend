import { Router } from "express";
import { userLogin, userRegister } from "./auth.controller.js";
const authRouter = Router();

authRouter.post("/login", userLogin);
authRouter.post("/register", userRegister);

export { authRouter };
