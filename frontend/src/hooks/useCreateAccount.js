import { useState } from "react";
import apiClient from "../utils/apiClient";
//import { useAuthContext } from "../hooks/useAuthContext";

export const useCreateAccount = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //const { dispatch } = useAuthContext();

  const createAccount = async (fname, lname, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const json = await apiClient("/api/auth/users/createUser", {
        method: "POST",
        body: { fname, lname, email, password },
      });

      // update auth context if desired
      //dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      return json;
    } catch (err) {
      setIsLoading(false);
      if (!error) setError(err.message);
      throw err;
    }
  };

  return { createAccount, isLoading, error };
};
export default useCreateAccount;
