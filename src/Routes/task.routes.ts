import { validateData } from "Middleware/validateData";
import { verifyToken } from "Middleware/verifyToken";
import { Router } from "express";
import { createTask, getAllTasks, getTasksViaDate } from "Task/task.controller";
import { createTaskSchema } from "validation/task.validation";

const taskRoutes = Router();

taskRoutes.post(
  "/create",
  verifyToken,
  validateData(createTaskSchema),
  createTask
);

taskRoutes.post("/", verifyToken, getTasksViaDate);
taskRoutes.post("/all", verifyToken, getAllTasks);

export { taskRoutes };
