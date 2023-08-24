import { Router } from "express";

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

router.post("/", (req, res) => {
  res.json({ mssg: "post a new workout" });
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
