import useEmailVerification from "../hooks/useEmailVerification.js";

const EmailVerified = () => {
  const isVerified = useEmailVerification();

  if (isVerified === null) {
    return <div>Checking email verification status...</div>;
  }
  if (!isVerified) {
    return (
      <div className="email-verified-container">
        <h1>Verification Failed</h1>
        <p>
          We couldn&apos;t verify your email. Please try the verification link
          again or contact support.
        </p>
        <a href="/" className="login-link">
          Go Home
        </a>
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
      <a href="/login" className="login-link">
        Go to Login
      </a>
    </div>
  );
};

export default EmailVerified;
