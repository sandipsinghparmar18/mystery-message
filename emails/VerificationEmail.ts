export function getVerificationEmailHtml(
  username: string,
  otp: string
): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Verification Code</title>
      <style>
        body {
          background-color: #f9f9f9;
          padding: 20px;
          font-family: Roboto, Verdana, sans-serif;
        }
        .container {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          max-width: 500px;
          margin: 0 auto;
        }
        h2 {
          margin-bottom: 16px;
        }
        .otp {
          font-size: 20px;
          font-weight: bold;
          margin: 12px 0;
        }
        p {
          margin: 8px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Hello ${username},</h2>
        <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
        <p class="otp">${otp}</p>
        <p>If you did not request this code, please ignore this email.</p>
      </div>
    </body>
  </html>
  `;
}
