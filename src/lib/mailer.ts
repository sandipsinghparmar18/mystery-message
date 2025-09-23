const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  service: "gmail", // use 'gmail', 'outlook', 'yahoo' or custom SMTP
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // app password, not real password
  },
});
