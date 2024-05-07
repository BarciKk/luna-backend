import { sendMail } from "../../../mail.controller.js";
import { resetPasswordSuccess } from "../template/resetPasswordSuccess.template.js";
async function successResetPasswordMail(username: string, to: string) {
  const subject = "Your reset password requested pin.";
  const text = "You have requested a password reset.";
  const html = resetPasswordSuccess(username);

  await sendMail(to, subject, text, html);
}
export { successResetPasswordMail };
