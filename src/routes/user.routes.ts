import { getCurrentUser } from "User/user.controller";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/:userId", getCurrentUser);

export { userRouter };
