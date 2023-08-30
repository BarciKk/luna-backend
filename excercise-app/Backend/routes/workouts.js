import { Router } from "express";
import {
  createWorkout,
  deleteWorkout,
  getAllWorkouts,
  getSingleWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";
const router = Router();

//get workouts
router.get("/", getAllWorkouts);

//get single workout
router.get("/:id", getSingleWorkout);

//post new workout

router.post("/", createWorkout);

//delete single workout
router.delete("/:id", deleteWorkout);

//update  workout
router.patch("/:id", updateWorkout);

export { router };
