import { createContext, useState } from "react";
import { registerRequest } from "../api/auth.api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  return (
    <AuthContext.Provider value={{ signup, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
