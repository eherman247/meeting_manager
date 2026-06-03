import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../utils/apiClient";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (!token) {
      setError("Missing or invalid reset token");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient(`/api/auth/users/reset-password/${token}`, {
        method: "PATCH",
        body: { newPassword: password },
      });
      console.log("Received reset password response:", data);
      navigate("/login");
    } catch (err) {
      if (!error)
        setError(
          err.message || "An error occurred while resetting the password",
        );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <h1>Reset Password</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="confirmPassword">Confirm New Password:</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ResetPassword;
