import { sendMail } from "../index.js";

async function sendWelcomeEmail() {
  const subject = "Welcome to YourApp!";
  const text = "Thank you for signing up. We're excited to have you!";
  const html = "<p>Thank you for signing up. We're excited to have you!</p>";
  await sendMail("kamil.bartuzel@gmail.com", subject, text, html);
}

async function main() {
  await sendWelcomeEmail();
}
main();
