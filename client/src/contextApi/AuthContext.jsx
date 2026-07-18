// src/contextApi/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        // Set default authorization header
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${storedToken}`;
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Login function
  const login = async (credentials) => {
    setAuthLoading(true);
    setAuthError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials,
      );
      console.log("Login response:", response.data);

      if (response.data.success) {
        const token =
          response.data.token ||
          response.data.data?.token ||
          response.data.accessToken;

        const userData =
          response.data.user || response.data.data?.user || response.data.data;

        if (token) {
          localStorage.setItem("token", token);
          setToken(token);

          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);

          // Set default authorization header
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          setAuthLoading(false);
          return true;
        } else {
          setAuthError("No token received from server");
          setAuthLoading(false);
          return false;
        }
      } else {
        setAuthError(response.data.message || "Login failed");
        setAuthLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        setAuthError(error.response.data?.message || "Login failed");
      } else if (error.request) {
        setAuthError("Cannot connect to server. Please check your connection.");
      } else {
        setAuthError("An error occurred. Please try again.");
      }

      setAuthLoading(false);
      return false;
    }
  };

 const register = async (userData) => {
    setAuthLoading(true);
    setAuthError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      console.log('Registration response:', response.data);
      
      if (response.data.success) {
        // Extract token if auto-login after registration
        const token = response.data.token || response.data.data?.token;
        const user = response.data.user || response.data.data?.user;
        
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          setToken(token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        
        setAuthLoading(false);
        return true;
      } else {
        setAuthError(response.data.message || 'Registration failed');
        setAuthLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response) {
        setAuthError(error.response.data?.message || 'Registration failed');
      } else if (error.request) {
        setAuthError('Cannot connect to server');
      } else {
        setAuthError('An error occurred. Please try again.');
      }
      
      setAuthLoading(false);
      return false;
    }
  };


  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    authLoading,
    authError,
    setAuthError,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// // In your AuthContext.js
// const register = async (userData) => {
//   setAuthLoading(true);
//   setAuthError('');

//   try {
//     const response = await axios.post('http://localhost:5000/api/auth/register', userData);

//     if (response.data.success) {
//       const token = response.data.token || response.data.data?.token;
//       const user = response.data.user || response.data.data?.user;

//       if (token) {
//         localStorage.setItem('token', token);
//         localStorage.setItem('user', JSON.stringify(user));
//         setUser(user);
//         setToken(token);
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       }

//       setAuthLoading(false);
//       return true;
//     } else {
//       setAuthError(response.data.message || 'Registration failed');
//       setAuthLoading(false);
//       return false;
//     }
//   } catch (error) {
//     console.error('Registration error:', error);
//     setAuthError(error.response?.data?.message || 'Registration failed');
//     setAuthLoading(false);
//     return false;
//   }
// };

// // Then in your Register component use:
// const { register } = useAuth();

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   // ... validation
//   const success = await register(userData);
//   if (success) {
//     navigate('/admin/dashboard');
//   }
// };

// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// const getStoredUser = () => {
//   const stored = localStorage.getItem("realestate_user");
//   return stored ? JSON.parse(stored) : null;
// };

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(getStoredUser);
//   const [authLoading, setAuthLoading] = useState(false);
//   const [authError, setAuthError] = useState("");

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("realestate_user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("realestate_user");
//     }
//   }, [user]);

//   const login = async ({ email, password }) => {
//     setAuthError("");
//     setAuthLoading(true);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 300));

//       if (email === "ritikpal227@gmail.com" && password === "admin123") {
//         const admin = { email, name: "Admin", role: "admin" };
//         setUser(admin);
//         return true;
//       }

//       setAuthError("Invalid admin credentials");
//       return false;
//     } finally {
//       setAuthLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setAuthError("");
//   };

//   const isAdmin = user?.role === "admin";

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAdmin,
//         authLoading,
//         authError,
//         login,
//         logout,
//         setAuthError,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// }
