import dotenv from "dotenv";
dotenv.config();

console.log("PORT", process.env.PORT);
console.log("URI", process.env.MONGO_URI);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

export { PORT, MONGO_URI };
