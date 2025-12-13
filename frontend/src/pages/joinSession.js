import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const JoinSession = () => {
  const [sessionCode, setSessionCode] = useState('');
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(`/timeSessions/${sessionCode}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      });
      const json = await response.json();
      console.log("time session response", json);
      if (!response.ok) {
        throw new Error(json.error || 'Failed to join session');
      }

      if (json.password) {
        if (password !== json.password) {
          throw new Error('Incorrect password');
        }
      }
      localStorage.setItem('currentTimeSession', JSON.stringify(json));
      navigate('/timeSession');
      setSessionCode('');
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="JoinSession" onSubmit={handleSubmit}>
      <h3>Join Time Session</h3>
      <label>Session Code:</label>
      <input
        type="text"
        onChange={(e) => setSessionCode(e.target.value)}
        value={sessionCode}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="submit" disabled={isLoading}>Join Session</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default JoinSession;