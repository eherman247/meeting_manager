import { createContext, useReducer, useEffect } from "react";
import apiClient from "../utils/apiClient";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    dispatch({ type: "LOGIN", payload: user });

    const verifyToken = async () => {
      try {
        await apiClient("/api/auth/users/verify", {
          requireAuth: true,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      } catch (error) {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      }
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
