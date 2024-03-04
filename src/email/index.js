import nodemailer from "nodemailer";
import { MAIL_CONFIG } from "../../config/config.js";

export const sendMail = async (to, subject, text, html) => {
  const transporter = nodemailer.createTransport(MAIL_CONFIG);

  const info = await transporter.sendMail({
    from: "mailtrap@demomailtrap.com", //we have to change that in the future
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
  console.log("Message sent: %s", info.messageId);
};
