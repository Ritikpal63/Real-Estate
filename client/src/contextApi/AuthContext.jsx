import { createContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthLoading(false);
        return;
      }
      try {
        const res = await axiosInstance.get("/auth/me");
        setUser(res.data.user);
        setIsAdmin(res.data.user?.role === "admin");
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
        setIsAdmin(false);
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await axiosInstance.post("/auth/login", credentials);

      if (!res.data.token) {
        console.error("Login response me token nahi mila:", res.data.user);
        setAuthError("Token not found from server. Check backend response");
        return false;
      }

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setIsAdmin(res.data.user?.role === "admin");
      return true;
    } catch (err) {
      setAuthError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (userData) => {
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await axiosInstance.post("/auth/register", userData);

      if (res.data.success) {
        return true;
      }

      return false;
    } catch (err) {
      setAuthError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );

      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAdmin(false);
  };

  const isAuthenticated = useCallback(() => !!user, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAdmin,
        authLoading,
        authError,
        setAuthError,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
