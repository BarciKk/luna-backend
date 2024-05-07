import nodemailer from "nodemailer";
import { EMAIL_PASS, EMAIL_USER } from "../config/config.js";
export const sendMail = async (
  to: string,
  subject: string,
  text: string,
  html: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: "lunasync.help@gmail.com",
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
  console.log("Message sent: %s", info.messageId);
};
