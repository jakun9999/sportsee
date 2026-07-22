import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(() => {
    return sessionStorage.getItem("userId") || null;
  });
  const [weeklyGoal, setWeeklyGoal] = useState(() => {
    return sessionStorage.getItem("weeklyGoal") || null;
  });
  const [token, setToken] = useState(() => {
    return sessionStorage.getItem("token") || null;
  });

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

      // 1. Sauvegarde explicite dans le sessionStorage avec la NOUVELLE valeur
      sessionStorage.setItem("token", newToken);
      sessionStorage.setItem("userId", newUserId);
      sessionStorage.setItem("weeklyGoal", newGoal);

      // 2. Mise à jour du state React
      setToken(newToken);
      setUserId(newUserId);
      setWeeklyGoal(newGoal);

      return newUserId;
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      throw error;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("weeklyGoal");

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
