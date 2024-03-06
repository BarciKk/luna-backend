import dotenv from "dotenv";
dotenv.config();
const SESSION_KEY = process.env.SESSION_KEY;
const EMAIL_USER = process.env.MAIL_USER;
const EMAIL_PASS = process.env.MAIL_PASS;
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export { PORT, MONGO_URI, ACCESS_TOKEN, EMAIL_PASS, EMAIL_USER, SESSION_KEY };
