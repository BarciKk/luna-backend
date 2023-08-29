import { Router } from "express";
import { Workout } from "../models/workoutModel";
const router = Router();

//get workouts
router.get("/", (req, res) => {
  res.json({ mssg: "Get all workouts" });
});

//get single workout
router.get("/:id", (req, res) => {
  res.json({ mssg: "get single workout" });
});

//post new workout

router.post("/", async (req, res) => {
  const { title, sets, reps } = req.body;
  try {
    const workout = await Workout.create({ title, sets, reps });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ err: err.mssg });
  }
});

//delete single workout
router.delete("/:id", (req, res) => {
  res.json({ mssg: "delete  workout" });
});

//update  workout
router.patch("/:id", (req, res) => {
  res.json({ mssg: "update the workout" });
});

export { router };
