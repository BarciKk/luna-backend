import { sendMail } from "email/mail.controller";
import { resetPasswordSuccess } from "../template/resetPasswordSuccess.template";

async function successResetPasswordMail(username: string, to: string) {
  const subject = "Your reset password requested pin.";
  const text = "You have requested a password reset.";
  const html = resetPasswordSuccess(username);

  await sendMail(to, subject, text, html);
}
export { successResetPasswordMail };
