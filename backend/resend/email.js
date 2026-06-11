const resend = require("./config.js");
const logger = require("../utils/logger");
const host_email = process.env.RESEND_EMAIL;
const verificationEmailTemplate = require("./emailTemplates.js");
const resetPasswordTemplate = require("./resetPasswordTemplate.js");

const sendVerificationEmail = async (email, token) => {
  try {
    await resend.emails.send({
      from: host_email,
      to: email,
      subject: "Verify your email",
      html: verificationEmailTemplate(token),
    });
  } catch (error) {
    logger.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

const sendResetPasswordEmail = async (email, resetPasswordToken) => {
  try {
    await resend.emails.send({
      from: host_email,
      to: email,
      subject: "Reset your password",
      html: resetPasswordTemplate(resetPasswordToken),
    });
  } catch (error) {
    logger.error("Error sending reset password email:", error);
    throw new Error("Failed to send reset password email");
  }
};

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
};
