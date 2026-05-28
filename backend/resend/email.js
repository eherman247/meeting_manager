const resend = require("./config.js");
const verificationEmailTemplate = require("./emailTemplates.js");

const sendVerificationEmail = async (email, token) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email",
      html: verificationEmailTemplate(token),
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

module.exports = sendVerificationEmail;
