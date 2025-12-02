import { useState } from "react";
import { useCreateAccount } from "../hooks/useCreateAccount";

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const { createAccount, error: createAccountError, isLoading } = useCreateAccount();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createAccount(firstName, lastName, email, password);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="createAccount" onSubmit={handleSubmit}>
      <h3>Create Account</h3>
      <label>First Name:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <label>Last Name:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
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
      <label>Confirm Password:</label>
      <input
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />
      <button disabled={isLoading} type="submit">Create Account</button>
      {createAccountError && <div className="error">{createAccountError}</div>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default CreateAccount;