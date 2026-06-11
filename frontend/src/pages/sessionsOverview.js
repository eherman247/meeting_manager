import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTimeSessionContext } from "../hooks/useTimeSessionContext";
import { useAuthContext } from "../hooks/useAuthContext";
import apiClient from "../utils/apiClient";

const SessionsOverview = () => {
  const navigate = useNavigate();
  const { timeSessions, dispatch } = useTimeSessionContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return;

      const json = await apiClient("/timeSessions", {
        requireAuth: true,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      dispatch({ type: "SET_TIMESESSIONS", payload: json });
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
                    JSON.stringify({
                      title: session.title,
                      sessionCode: session.sessionCode,
                    }),
                  );
                  navigate("/timeSession");
                }}
              >
                Join Session
              </button>
              <button
                className="page-button"
                onClick={() => {
                  apiClient(`/timeSessions/${session._id}`, {
                    method: "DELETE",
                    requireAuth: true,
                    headers: {
                      Authorization: `Bearer ${user.token}`,
                    },
                  })
                    .then(() => {
                      dispatch({
                        type: "DELETE_TIMESESSION",
                        payload: session,
                      });
                      if (
                        JSON.parse(localStorage.getItem("currentTimeSession"))
                          ?.sessionCode === session.sessionCode
                      ) {
                        localStorage.removeItem("currentTimeSession");
                        navigate("/sessionsOverview");
                      }
                    })
                    .catch(() => {
                      // ignore delete failures for UI flow
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
