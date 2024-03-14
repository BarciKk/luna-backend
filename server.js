import express from "express";
import mongoose from "mongoose";
import { authRouter } from "./src/auth/user/auth.routes.js";
import { workoutRouter } from "./src/workout/workout.routes.js";
import { MONGO_URI, PORT, SESSION_KEY } from "./config/config.js";
import dotenv from "dotenv";
import cors from "cors";
import Session from "express-session";

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
app.use(express.json());
app.use(
  Session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: "none" },
  })
);
app.use("/workouts", workoutRouter);
app.use("/auth", authRouter);

mongoose
  .connect(MONGO_URI)
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
