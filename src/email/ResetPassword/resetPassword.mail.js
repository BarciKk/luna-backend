import { sendMail } from "../index.js";

async function resetPasswordToken(pin, to) {
  const subject = "Welcome to YourApp!";
  const text = "Thank you for signing up. We're excited to have you!";
  const html = `<p>Thank you for signing up. We're excited to have you!</p>
    <h4>${pin}</h4>
  `;
  await sendMail(to, subject, text, html);
}
export { resetPasswordToken };
