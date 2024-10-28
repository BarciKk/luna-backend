import { sendMail } from "Email/maill.controller";
import { forgotPassword } from "./forgotPassword.template";

async function forgotPasswordToken(
  username: string,
  to: string,
  token: string
) {
  const subject = "Your reset password requested pin.";
  const text = "You have requested a password reset.";
  const html = forgotPassword(username, token);

  await sendMail(to, subject, text, html);
}
export { forgotPasswordToken };
