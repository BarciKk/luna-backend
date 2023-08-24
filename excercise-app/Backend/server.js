import express from "express";
import mongoose from "mongoose";
import { router } from "./routes/workouts.js";
import { PORT } from "./config/config.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use("/api/workouts/", router);

//connect DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        "Connected property to the Database & working on port:",
        PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
