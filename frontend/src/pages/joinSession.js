import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const JoinSession = () => {
  const [sessionCode, setSessionCode] = useState('');
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
      if (!response.ok) {
        throw new Error(json.error || 'Failed to join session');
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
      <button type="submit" disabled={isLoading}>Join Session</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default JoinSession;