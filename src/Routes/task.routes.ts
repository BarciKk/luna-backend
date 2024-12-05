import { verifyToken } from "Middleware/verifyToken";
import { Router } from "express";
import { createTask } from "Task/task.controller";

const taskRoutes = Router();

taskRoutes.post("/create", verifyToken, createTask);

export { taskRoutes };
