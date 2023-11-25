import express from "express";
import mongoose from "mongoose";
import { authRouter } from "./src/auth/user/auth.routes.js";
import { workoutRouter } from "./src/workout/workout.routes.js";
import { MONGO_URI, PORT } from "./config/config.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use("/workouts", workoutRouter);
app.use("/auth", authRouter);

//connect DB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        "Connected property to the Database & working on port:",
        PORT
      );
    });
  })
  .catch((err) => {
    throw new Error("field connecting to the database", err);
  });

//
