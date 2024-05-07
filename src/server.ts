import mongoose from "mongoose";
import { authRouter } from "./auth/auth.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { MONGO_URI, PORT } from "./config/config.js";

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
app.use(express.json());

app.use("/auth", authRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Connected property to the Database & working on port:${PORT}`
      );
    });
  })
  .catch(() => {
    throw new Error("field connecting to the database");
  });
