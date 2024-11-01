import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { authRoutes } from "./Routes/auth.routes";
import { userRoutes } from "Routes/user.routes";

dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
