
import { useEffect } from 'react';
import { useTimeSessionContext } from '../hooks/useTimeSessionContext';
import { useAuthContext } from '../hooks/useAuthContext';

const SessionsOverview = () => {
  const { timeSessions, dispatch } = useTimeSessionContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return;

      const response = await fetch('/timeSessions', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_TIMESESSIONS', payload: json });
      }
    };

    fetchSessions();
  }, [dispatch, user]);

  return (
    <div>
      <h1>Sessions Overview</h1>
      {timeSessions && timeSessions.map(session => (
        <div key={session._id}>
          <h2>{session.title}</h2>
          <h3>ID: {session._id}</h3>
          <p>Created: {new Date(session.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default SessionsOverview;