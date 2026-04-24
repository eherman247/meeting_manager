import { useState } from "react";
import { useCreateAccount } from "../hooks/useCreateAccount";

const CreateAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const {
    createAccount,
    error: createAccountError,
    isLoading,
  } = useCreateAccount();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createAccount(firstName, lastName, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Create Account</h3>

      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          placeholder="Enter your first name"
          required
        />
      </div>

      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          placeholder="Enter your last name"
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter your email address"
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter your password"
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          placeholder="Confirm your password"
          required
        />
      </div>

      <button disabled={isLoading} type="submit" className="submit-btn">
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>

      {createAccountError && <div className="error">{createAccountError}</div>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CreateAccount;
