import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Les états démarrent à null (plus de lecture depuis sessionStorage)
  const [userId, setUserId] = useState(null);
  const [weeklyGoal, setWeeklyGoal] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post("/api/login", credentials, {
        withCredentials: true,
      });

      const {
        token: newToken,
        userId: newUserId,
        weeklyGoal: newGoal,
      } = response.data;

      // 1. Mise à jour uniquement dans l'état React (en mémoire)
      setToken(newToken);
      setUserId(newUserId);
      setWeeklyGoal(newGoal);

      return newUserId;
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
