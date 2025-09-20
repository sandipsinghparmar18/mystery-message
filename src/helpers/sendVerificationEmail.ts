import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // replace with your verified domain in production
      to: email,
      subject: "Mystry message | Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError: any) {
    console.error(
      "Error sending verification email",
      emailError.response?.data || emailError
    );
    return { success: false, message: "Failed to send verification email" };
  }
}
