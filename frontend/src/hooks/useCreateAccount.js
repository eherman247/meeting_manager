import {useState} from "react";
import {useAuthContext} from "../hooks/useAuthContext";

export const useCreateAccount = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {dispatch} = useAuthContext();

  const createAccount = async (fname, lname, email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch('/api/auth/users/createUser', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({fname, lname, email, password})
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error || json.message || 'Could not create account');
    }
    if (response.ok) {
      // Account created successfully
      localStorage.setItem('user', JSON.stringify(json));

      // update auth context
      dispatch({type: 'LOGIN', payload: json});

      setIsLoading(false);
    }
  };

  return {createAccount, isLoading, error};



}
export default useCreateAccount;