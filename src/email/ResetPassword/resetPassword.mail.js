import { sendMail } from "../mail.controller.js";
import { passwordsResetTemplate } from "../templates/resetPassword.template.js";
async function resetPasswordToken(pin, to, username) {
  const subject = "Your reset password requested pin.";
  const text =
    "You have requested a password reset. Please use the following PIN:";
  const html = passwordsResetTemplate(pin, username);

  await sendMail(to, subject, text, html, username);
}
export { resetPasswordToken };
