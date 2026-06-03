import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../utils/apiClient";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient("/api/auth/users/forgot-password", {
        method: "POST",
        body: { email: email },
      });
      console.log("Received forgot password response:", data);
      navigate("/passwordResetSent");
    } catch (err) {
      if (!error)
        setError(
          err.message ||
            "An error occurred while sending the password reset email",
        );
    } finally {
      setIsLoading(false);
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Password Reset Email"}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ForgotPassword;
