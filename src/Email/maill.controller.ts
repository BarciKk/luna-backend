import nodemailer from "nodemailer";
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
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
  console.log("Message sent: %s", info.messageId);
};
