import { createContext, useEffect, useState } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
} from "../api/auth.api";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const resetAuthState = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setLoading(false);
  };

  const handleAuthSuccess = (data) => {
    setUser(data);
    setIsAuthenticated(true);
    setIsAdmin(data.rol === "admin");
    setLoading(false);
  };

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      handleAuthSuccess(res.data);
    } catch (error) {
      const errorMessages = Array.isArray(error.response?.data)
        ? error.response.data
        : [error.response?.data?.message || "Error desconocido"];
      setErrors(errorMessages);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      handleAuthSuccess(res.data);
    } catch (error) {
      setErrors(
        Array.isArray(error.response?.data)
          ? error.response.data
          : [error.response?.data?.message || "Error desconocido"]
      );
    }
  };

  const logout = () => {
    Cookies.remove("token");
    resetAuthState();
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000); //5 segundos o 5000 milisegundos
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) return resetAuthState();

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) return resetAuthState();

        handleAuthSuccess(res.data);
      } catch (error) {
        console.error(error);
        resetAuthState();
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        loading,
        user,
        isAuthenticated,
        isAdmin,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
