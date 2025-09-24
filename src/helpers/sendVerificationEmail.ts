import { getVerificationEmailHtml } from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { transporter } from "@/lib/mailer";

interface MailError extends Error {
  code?: string;
  response?: string;
  responseCode?: number;
  command?: string;
}

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    //const emailHtml = render(<VerificationEmail username={username} otp={verifyCode} />);
    await transporter.sendMail({
      from: `"Mystry Message" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Mystry message | Verification Code",
      html: getVerificationEmailHtml(username, verifyCode),
    });
    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError) {
    const err = emailError as MailError;
    console.error("Email error: ", err);

    return {
      success: false,
      message: "Failed to send verification email due to server error.",
    };
  }
}

// const response = await resend.emails.send({
//       from: "onboarding@resend.dev", // replace with your verified domain in production
//       to: email,
//       subject: "Mystry message | Verification Code",
//       react: VerificationEmail({ username, otp: verifyCode }),
//     });
