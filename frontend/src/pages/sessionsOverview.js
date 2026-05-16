import { useEffect } from "react";
import { useTimeSessionContext } from "../hooks/useTimeSessionContext";
import { useAuthContext } from "../hooks/useAuthContext";

const SessionsOverview = () => {
  const { timeSessions, dispatch } = useTimeSessionContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return;

      const response = await fetch("/timeSessions", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TIMESESSIONS", payload: json });
      }
    };

    fetchSessions();
  }, [dispatch, user]);

  return (
    <div className="sessions-overview">
      <h1>Sessions Overview</h1>
      {timeSessions &&
        timeSessions.map((session) => (
          <div key={session.sessionCode} className="time-session-item">
            <h2>{session.title}</h2>
            <h3>Session Code: {session.sessionCode}</h3>
            <p>Created: {new Date(session.createdAt).toLocaleDateString()}</p>
            <div className="time-session-actions">
              <button
                className="page-button"
                onClick={() => {
                  localStorage.setItem(
                    "currentTimeSession",
                    JSON.stringify(session),
                  );
                  window.location.href = "/timeSession";
                }}
              >
                Join Session
              </button>
              <button
                className="page-button"
                onClick={() => {
                  fetch(`/timeSessions/${session._id}`, {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${user.token}`,
                    },
                  }).then((response) => {
                    if (response.ok) {
                      dispatch({
                        type: "DELETE_TIMESESSION",
                        payload: session,
                      });
                    }
                  });
                }}
              >
                delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SessionsOverview;
