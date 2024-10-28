export const forgotPassword = (username: string, token: string) =>
  `
  <div
  style="
    margin: 0 auto;
    font-family: 'Poppins', sans-serif;
    max-width: 600px;
    border-radius: 8px;
    padding: 45px 30px 60px;
    background: #f5f5f5;
    background-image: url(https://img.freepik.com/free-vector/watercolor-amber-background_23-2150241002.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709769600&semt=ais);
    background-repeat: no-repeat;
    background-size: 800px 452px;
    background-position: top center;
    font-size: 14px;
    color: #434343;
  "
  >
  <main>
    <div
      style="
        margin: 0;
        margin-top: 5em;
        padding: 92px 30px 115px;
        background: #ffffff;
        border-radius: 3em;
        text-align: center;
      "
    >
      <div style="width: 100%; max-width: 489px; margin: 0 auto">
        <h1
          style="
            margin: 0;
            font-size: 24px;
            font-weight: 500;
            color: #1f1f1f;
          "
        >
          Your OTP
        </h1>
        <p
          style="
            margin: 0;
            margin-top: 10px;
            font-size: 16px;
            font-weight: 500;
          "
        >
          Hey, ${username}
        </p>
          <a href="http://localhost:8000/accounts/resetPassword/${token}">here!</a>
      </div>
    </div>
    </p>
  </main>
  
  <footer
    style="
      width: 100%;
      max-width: 490px;
      margin: 20px auto 0;
      text-align: center;
      border-top: 1px solid #e6ebf1;
    "
  >
    <p style="margin: 0; margin-top: 16px; color: #434343">
      Copyright © 2024 Company. All rights reserved.
    </p>
  </footer>
  </div>
  `;
