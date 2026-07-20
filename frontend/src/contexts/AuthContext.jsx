import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (credentials) => {
    const response = await axios.post("/api/login", credentials, {
      withCredentials: true,
    });
    console.log(response);
    setToken(response.data.token);
    setUserId(response.data.userId);
    return response.data.userId;
  };

  const logout = async () => {
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé pour consommer le contexte facilement
export const useAuth = () => useContext(AuthContext);
