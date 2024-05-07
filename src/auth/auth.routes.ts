import { Router } from "express";
import { userLogin, userRegister } from "./user/user.controller.js";

const authRouter = Router();

authRouter.post("/login", userLogin);
authRouter.post("/register", userRegister);

export { authRouter };
