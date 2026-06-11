import { useState } from "react";
import { useTimeSessionContext } from "../hooks/useTimeSessionContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient";

export const TimeSessionForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useTimeSessionContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError("You must be logged in");
      return;
    }

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    // Generates a random alphanumeric string of length 6 for the session code
    let randomId = Math.random().toString(36).substring(2, 8);
    let unique = false;
    while (!unique) {
      try {
        // If endpoint returns 200 then code exists; if it throws with 404 then it's unique
        await apiClient(`/timeSessions/code/${randomId}`, {
          method: "GET",
          requireAuth: true,
        });
        // code exists, try another
        randomId = Math.random().toString(36).substring(2, 8);
        continue;
      } catch (err) {
        if (err.status === 404) {
          unique = true;
          break;
        }
        setError(err.message || "Could not verify session code uniqueness");
        setLoading(false);
        return;
      }
    }

    const timeSessionData = {
      title,
      password: password || null,
      sessionCode: randomId,
    };
    setLoading(true);

    try {
      const json = await apiClient("/timeSessions", {
        method: "POST",
        body: timeSessionData,
        requireAuth: true,
      });

      setTitle("");
      setPassword("");
      dispatch({ type: "CREATE_TIMESESSION", payload: json });

      localStorage.setItem(
        "currentTimeSession",
        JSON.stringify({ title: json.title, sessionCode: json.sessionCode }),
      );

      navigate("/timeSession");
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Session Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
      />
      <label>Session Password (optional):</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Time Session"}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TimeSessionForm;
