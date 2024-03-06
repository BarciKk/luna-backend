export const passwordsResetTemplate = (pin, username) =>
  `
  <div style="padding: 10px; max-width: 600px; width: 100%; margin: 0 auto; background-color: #d3d3d3;">
  <h1 style="margin-bottom: 1.5em;">Hello, ${username}</h1>
  <p  style="margin-bottom: 1.5em;">
    We got your request for password reset, but first, you must verify yourself.
  </p>
  <h4 style="margin-bottom: 1.5em;">Use the pin below</h4>
  <h1 class="pin" style="text-align: center; margin-top: 1.5em; margin-bottom: 3em;">${pin}</h1>

  <p  style="font-size: 14px; margin-bottom: 5em;">
    If you didn't request this reset, please ignore this email.
  </p>

  <p style="margin-bottom: 5em;">Greeting @LunaTeam</p>
</div>
`;
//this is just for now im gonna rebuild that when im gonna finish resetPassword feature
