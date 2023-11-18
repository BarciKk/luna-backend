import { Router } from "express";
import {
  createWorkout,
  deleteWorkout,
  getAllWorkouts,
  getSingleWorkout,
  updateWorkout,
} from "./workout.controller.js";
const workoutRouter = Router();

workoutRouter.get("/", getAllWorkouts);

workoutRouter.get("/:id", getSingleWorkout);

workoutRouter.post("/", createWorkout);

workoutRouter.delete("/:id", deleteWorkout);

workoutRouter.patch("/:id", updateWorkout);

export { workoutRouter };
