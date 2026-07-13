import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const getStoredUser = () => {
  const stored = localStorage.getItem("realestate_user");
  return stored ? JSON.parse(stored) : null;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (user) {
      localStorage.setItem("realestate_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("realestate_user");
    }
  }, [user]);

  const login = async ({ email, password }) => {
    setAuthError("");
    setAuthLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (email === "ritikpal227@gmail.com" && password === "admin123") {
        const admin = { email, name: "Admin", role: "admin" };
        setUser(admin);
        return true;
      }

      setAuthError("Invalid admin credentials");
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAuthError("");
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        authLoading,
        authError,
        login,
        logout,
        setAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}