import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [weeklyGoal, setWeeklyGoal] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post("/api/login", credentials, {
        withCredentials: true,
      });
      setToken(response.data.token);
      setUserId(response.data.userId);
      setWeeklyGoal(response.data.weeklyGoal);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Reinitialisation simple des états en mémoire
    setToken(null);
    setUserId(null);
    setWeeklyGoal(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        token,
        weeklyGoal,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
