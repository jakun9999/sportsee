import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [weeklyGoal, setWeeklyGoal] = useState(null);

  const login = async (credentials) => {
    const response = await axios.post("/api/login", credentials, {
      withCredentials: true,
    });
    setToken(response.data.token);
    setUserId(response.data.userId);
    setWeeklyGoal(response.data.weeklyGoal);
    return response.data.userId;
  };

  const logout = async () => {
    setToken(null);
    setUserId(null);
    setWeeklyGoal(null);
  };

  return (
    <AuthContext.Provider value={{ userId, token, weeklyGoal, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé pour consommer le contexte facilement
export const useAuth = () => useContext(AuthContext);
