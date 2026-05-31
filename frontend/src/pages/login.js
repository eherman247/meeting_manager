import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login, isLoading, error: loginError } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email.toLowerCase(), password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button type="submit" disabled={isLoading}>
          Login
        </button>
        {error && <div className="error">{error}</div>}
        {loginError && <div className="error">{loginError}</div>}
      </form>
      <button
        className="forgot-password-link"
        onClick={() => navigate("/forgot-password")}
      >
        Forgot Password?
      </button>
    </>
  );
};

export default Login;
