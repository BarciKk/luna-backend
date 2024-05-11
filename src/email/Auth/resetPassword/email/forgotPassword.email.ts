import { sendMail } from "../../../mail.controller.js";
import { forgotPassword } from "../template/forgotPassword.template.js";
async function forgotPasswordToken(username: string, to: string, token: string) {
  const subject = "Your reset password requested pin.";
  const text = "You have requested a password reset.";
  const html = forgotPassword(username, token);

  await sendMail(to, subject, text, html);
}
export { forgotPasswordToken };
