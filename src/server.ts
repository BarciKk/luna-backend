import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { authRouter } from "./routes/auth.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { MONGO_URI, PORT } from "./config/config.js";
import { swaggerOptions } from "swagger.config.js";

dotenv.config();

const swaggerJsDocs = swaggerJsdoc(swaggerOptions);

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:8000" }));

app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerJsDocs));

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected property to the Database & working on port:${PORT}`);
    });
  })
  .catch(() => {
    throw new Error("field connecting to the database");
  });
