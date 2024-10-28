import { Router } from "express";
import { verifyToken } from "Middleware/verifyToken";
import { getCurrentUser } from "User/user.controller";

const userRoutes = Router();

userRoutes.get("/:userId", verifyToken, getCurrentUser);

export { userRoutes };
