import dotenv from "dotenv";
dotenv.config();

const MAIL_CONFIG = {
  host: "send.smtp.mailtrap.io",
  port: 587,
  secure: false,
  auth: {
    user: "api",
    pass: "b3863e7cbc4172a7d7fc29695f357f6e",
  },
};
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export { PORT, MONGO_URI, ACCESS_TOKEN, MAIL_CONFIG };
