import { validateData } from "Middleware/validateData";
import { verifyToken } from "Middleware/verifyToken";
import { Router } from "express";
import { createTask } from "Task/task.controller";
import { createTaskSchema } from "validation/task.validation";

const taskRoutes = Router();

taskRoutes.post(
  "/create",
  verifyToken,
  validateData(createTaskSchema),
  createTask
);

export { taskRoutes };
