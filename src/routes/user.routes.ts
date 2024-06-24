import { Router } from "express";

import { getCurrentUser } from "User/user.controller";

const userRouter = Router();

userRouter.get("/:userId", getCurrentUser);

export { userRouter };
