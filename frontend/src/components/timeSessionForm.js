import { useState } from "react";
import { useTimeSessionContext } from "../hooks/useTimeSessionContext";
import { useAuthContext } from "../hooks/useAuthContext";

export const TimeSessionForm = () => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState(null);
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
      console.log(randomId);

      // Check if the generated session code is unique by making a GET request to the backend
      try {
        const response = await fetch(`/timeSessions/code/${randomId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          randomId = Math.random().toString(36).substring(2, 8);
          throw new Error(json.error || "Session code is not unique");
        }
        console.log("Session code is unique:", json);
        unique = true;
      } catch (error) {
        console.error("Error checking session code uniqueness:", error);
      }
    }

    const timeSessionData = {
      title,
      password: password || null,
      sessionCode: randomId,
    };
    setLoading(true);

    console.log("Submitting time session:", timeSessionData);
    console.log("User", user);

    try {
      const response = await fetch("/timeSessions", {
        method: "POST",
        body: JSON.stringify(timeSessionData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      console.log(
        "timeSessionData sent to server:",
        JSON.stringify(timeSessionData),
      );
      console.log("Response from server:", json);

      if (!response.ok) {
        throw new Error(json.error || "Failed to create session");
      }

      setTitle("");
      setPassword(null);
      dispatch({ type: "CREATE_TIMESESSION", payload: json });

      localStorage.setItem("currentTimeSession", JSON.stringify(json));

      console.log("Time session created successfully:", json);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
      window.location.href = "/timeSession";
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
