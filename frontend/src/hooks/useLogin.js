import { useState } from "react";
import apiClient from "../utils/apiClient";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const json = await apiClient("/api/auth/users/login", {
        method: "POST",
        body: { email, password },
      });
      console.log("Login successful, received response:", json);
      if (!json.isVerified) {
        setIsLoading(false);
        setError("Please verify your email before logging in");
        throw new Error("Please verify your email before logging in");
      }
      // Logged in successfully, save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      return json;
    } catch (err) {
      setIsLoading(false);
      if (!error) setError(err.message);
      throw err;
    }
  };

  return { login, isLoading, error };
};
export default useLogin;
