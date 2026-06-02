import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      const data = await response.json();
      console.log("Received forgot password response:", data);
      if (response.ok) {
        navigate("/passwordResetSent");
      } else {
        setError(data.error || "Failed to send password reset email");
      }
    } catch (err) {
      setError("An error occurred while sending the password reset email");
    }
  };

  return (
    <div className="forgot-password-page">
      <h1>Forgot Password</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Password Reset Email</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ForgotPassword;
