import { Router } from "express";
import { authLogin } from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/login/", authLogin);
// authRouter.post("logout", );
// authRouter.post("register", );

export { authRouter };
