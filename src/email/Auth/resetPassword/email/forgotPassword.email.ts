import { sendMail } from "email/mail.controller";
import { forgotPassword } from "../template/forgotPassword.template";

async function forgotPasswordToken(username: string, to: string, token: string) {
  const subject = "Your reset password requested pin.";
  const text = "You have requested a password reset.";
  const html = forgotPassword(username, token);

  await sendMail(to, subject, text, html);
}
export { forgotPasswordToken };
