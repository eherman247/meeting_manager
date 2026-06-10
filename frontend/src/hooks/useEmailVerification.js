import { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";

export const useEmailVerification = () => {
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const [resendStatus, setResendStatus] = useState(null);
  const [resendError, setResendError] = useState("");
  const [isResending, setIsResending] = useState(false);

  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    const checkEmailVerified = async () => {
      if (!token) {
        setStatus("failed");
        setMessage("Verification token is missing.");
        return;
      }

      try {
        const data = await apiClient("/api/auth/users/verify-email", {
          method: "PATCH",
          body: { token },
        });
        setStatus(data.isVerified ? "success" : "failed");
        setMessage(
          data.isVerified
            ? "Email verified successfully."
            : "Verification failed.",
        );
      } catch (error) {
        setStatus("failed");
        setMessage(
          error.message || "Unable to verify email. Please try again.",
        );
      }
    };

    checkEmailVerified();
  }, [token]);

  const resendVerificationToken = async () => {
    if (!token) {
      setResendStatus("failed");
      setResendError("Verification token is missing.");
      return;
    }

    setIsResending(true);
    setResendStatus(null);
    setResendError("");

    try {
      await apiClient("/api/auth/users/resend-verification", {
        method: "POST",
        body: { token },
      });
      setResendStatus("success");
    } catch (error) {
      setResendStatus("failed");
      setResendError(error.message || "Unable to resend verification email.");
    } finally {
      setIsResending(false);
    }
  };

  return {
    status,
    message,
    resendStatus,
    resendError,
    isResending,
    resendVerificationToken,
  };
};
export default useEmailVerification;
