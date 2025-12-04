import { useState } from "react";
import { useTimeSessionContext } from "../hooks/useTimeSessionContext";
import { useAuthContext } from "../hooks/useAuthContext";

export const useTimeSessionForm = () => {
  const [title, setTitle] = useState('');
  const [sessionCode, setSessionCode] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [error, setError] = useState(null);
  const { dispatch } = useTimeSessionContext();
  const { user } = useAuthContext();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in');
      return;
    }
    
    const randomString = Math.random().toString(36).substring(2, 8);
    setSessionCode(randomString);

    const timeSessionData = { title, sessionCode: randomString, ownerId: user._id };

    const response = await fetch('/timeSessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(timeSessionData)
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle('');
      setSessionCode('');
      setOwnerId('');
      setError(null);
      dispatch({type: 'CREATE_TIMESESSION', payload: json});
    }
  }

  return {
    title,
    setTitle,
    sessionCode,
    setSessionCode,
    ownerId,
    setOwnerId,
    error,
    handleSubmit
  };
}

export default useTimeSessionForm;