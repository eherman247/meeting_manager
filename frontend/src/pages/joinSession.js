import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient";

const JoinSession = () => {
  const [sessionCode, setSessionCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const normalizedCode = sessionCode.trim().toLowerCase();

    if (!normalizedCode) {
      setError("Please enter a valid session code.");
      setIsLoading(false);
      return;
    }

    try {
      const json = await apiClient(`/timeSessions/join`, {
        method: "POST",
        body: { sessionCode: normalizedCode, password },
      });

      localStorage.setItem(
        "currentTimeSession",
        JSON.stringify({ title: json.title, sessionCode: json.sessionCode }),
      );
      navigate("/timeSession");
      setSessionCode("");
      setError(null);
    } catch (err) {
      if (
        err.status === 404 &&
        !err.data?.error &&
        err.url?.endsWith("/timeSessions/join")
      ) {
        try {
          const json = await apiClient(`/timeSession/join`, {
            method: "POST",
            body: { sessionCode: normalizedCode, password },
          });

          localStorage.setItem(
            "currentTimeSession",
            JSON.stringify({ title: json.title, sessionCode: json.sessionCode }),
          );
          navigate("/timeSession");
          setSessionCode("");
          setError(null);
          return;
        } catch (fallbackErr) {
          setError(fallbackErr.message);
          return;
        }
      }
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
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
      <button className="page-button" type="submit" disabled={isLoading}>
        Join Session
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default JoinSession;
