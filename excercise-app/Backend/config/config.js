import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export { PORT, MONGO_URI, ACCESS_TOKEN };
