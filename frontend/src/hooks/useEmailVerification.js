import { useState, useEffect } from "react";

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
        const response = await fetch("/api/auth/users/verify-email", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        if (!response.ok) {
          setStatus("failed");
          setMessage(data.error || "Verification failed.");
          return;
        }
        setStatus(data.isVerified ? "success" : "failed");
        setMessage(
          data.isVerified
            ? "Email verified successfully."
            : "Verification failed.",
        );
      } catch (error) {
        setStatus("failed");
        setMessage("Unable to verify email. Please try again.");
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
      const response = await fetch("/api/auth/users/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (!response.ok) {
        setResendStatus("failed");
        setResendError(data.error || "Unable to resend verification email.");
      } else {
        setResendStatus("success");
        setResendError("");
      }
    } catch (error) {
      setResendStatus("failed");
      setResendError("Unable to resend verification email.");
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
