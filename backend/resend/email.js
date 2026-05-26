import resend from "./config.js";

export const sendVerificationEmail = async (email, token) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email",
      html: `<p>Click <a href="http://localhost:3000/verify-email?token=${token}">here</a> to verify your email.</p>`,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};
