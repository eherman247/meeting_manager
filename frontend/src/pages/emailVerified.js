import useEmailVerification from "../hooks/useEmailVerification.js";

const EmailVerified = () => {
  const {
    status,
    message,
    resendStatus,
    resendError,
    isResending,
    resendVerificationToken,
  } = useEmailVerification();

  if (status === "pending") {
    return <div>Checking email verification status...</div>;
  }

  if (status === "failed") {
    return (
      <div className="email-verified-container">
        <h1>Verification Failed</h1>
        <p>{message || "We couldn't verify your email."}</p>
        <button
          className="resend-verification-button"
          onClick={resendVerificationToken}
          disabled={isResending || resendStatus === "success"}
        >
          {isResending
            ? "Sending new verification email..."
            : "Resend verification email"}
        </button>
        {resendStatus === "success" && (
          <p className="success-message">
            A new verification email has been sent. Please check your inbox.
          </p>
        )}
        {resendError && <p className="error">{resendError}</p>}
      </div>
    );
  }

  return (
    <div className="email-verified-container">
      <h1>Email Verified!</h1>
      <p>
        Your email has been successfully verified. You can now log in to your
        account.
      </p>
    </div>
  );
};

export default EmailVerified;
