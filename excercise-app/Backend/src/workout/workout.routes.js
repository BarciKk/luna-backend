import { Router } from "express";
import {
  createWorkout,
  deleteWorkout,
  getAllWorkouts,
  getSingleWorkout,
  updateWorkout,
} from "./workout.controller.js";
const workoutRouter = Router();

//get workouts
workoutRouter.get("/", getAllWorkouts);

//get single workout
workoutRouter.get("/:id", getSingleWorkout);

//create new workout
workoutRouter.post("/", createWorkout);

//delete single workout
workoutRouter.delete("/:id", deleteWorkout);

//update  workout
workoutRouter.patch("/:id", updateWorkout);

export { workoutRouter };
