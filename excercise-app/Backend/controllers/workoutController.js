import { Workout } from "../models/workoutModel.js";
import mongoose from "mongoose";

const getAllWorkouts = async (req, res) => {
  const workout = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workout);
};

const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ err: "Your id is not valid!" });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ err: "workout not found!" });
  }
  res.status(200).json(workout);
};

const createWorkout = async (req, res) => {
  const { title, sets, reps } = req.body;
  try {
    const workout = await Workout.create({ title, sets, reps });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ err: "Cannot create workout!" });
  }
};
// delete single workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ err: "Id is not valid " });
  }
  try {
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
      return res.status(404).json({ err: "Workout not found!" });
    }
    res.status(200).json(workout);
  } catch (err) {
    res
      .status(400)
      .json({ err: "An error occurred while deleting the workout" });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ err: "Id is not valid " });
  }
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!workout) {
      return res.status(404).json({ err: "Cannot update workout" });
    }
    res.status(200).json(workout);
  } catch (err) {
    res
      .status(400)
      .json({ err: "An error occurred while updating the workout" });
  }
};

export {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
