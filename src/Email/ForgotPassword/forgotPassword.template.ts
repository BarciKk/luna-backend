export const forgotPassword = (username: string, token: string) => `
 <table
  style="width: 100%; max-width: 600px; margin: 0 auto; text-align: center;"
>
  <tr>
    <td style="font-size: 42px; font-weight: bold; color: rgb(101, 101, 236);">
      LunaSync
    </td>
  </tr>
  <tr>
    <td style="font-size: 24px; padding-top: 16px;">Reset your password</td>
  </tr>
  <tr>
    <td style="border-bottom: 2px solid rgb(101, 101, 236); width: 60%; margin: 0 auto; padding-bottom: 8px;"></td>
  </tr>
  <tr>
    <td style="padding-top: 30px; text-align: left; font-size: 16px; line-height: 1.6;">
      Hi, ${username},
      <br />
      You have requested to reset the password in your LunaSync account. Please click the link below to reset your password:
    </td>
  </tr>
  <tr>
    <td style="padding: 30px 0;">
      <a
        href="http://localhost:8000/accounts/resetPassword/${token}"
        style="
          display: inline-block;
          padding: 12px 24px;
          background-color: rgb(179, 179, 233);
          color: rgb(20, 20, 20);
          text-decoration: none;
          font-weight: bold;
          font-size: 16px;
        "
      >
        Reset Now!
      </a>
    </td>
  </tr>
  <tr>
    <td style="padding-top: 50px; font-size: 12px; color: gray;">
      If you did not request a password reset, feel free to ignore this message.
    </td>
  </tr>
</table>

`;
