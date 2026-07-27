import { createContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosConfig"; // apna actual path confirm kar lena

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  // App load hote hi check karo cookie/token se user logged in hai ya nahi
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setIsAdmin(res.data.user?.role === "admin");
      } catch (err) {
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
      const res = await axiosInstance.post("/api/auth/login", credentials, {
        withCredentials: true,
      });
      setUser(res.data.user);
      setIsAdmin(res.data.user?.role === "admin");
      return true;
    } catch (err) {
      setAuthError(
        err.response?.data?.message || "Login failed. Please try again."
      );
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout", {}, { withCredentials: true });
    } finally {
      setUser(null);
      setIsAdmin(false);
    }
  };

  // Stable reference rakhne ke liye useCallback — Login.jsx ke useEffect deps me
  // use ho raha hai, isliye ye function re-render pe dobara create nahi hoga
  const isAuthenticated = useCallback(() => {
    return !!user;
  }, [user]);

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
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};