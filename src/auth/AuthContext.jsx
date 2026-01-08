import { createContext, useContext, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email , password) => {
    const response = await api.post("/auth/login", { email, password });

    const {accessToken, refreshToken , role } = response.data;

    const authData = { accessToken, refreshToken , role };

    localStorage.setItem("auth", JSON.stringify(authData));
    setAuth(authData);
  };

  const logout = async () => {
    localStorage.removeItem("auth");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
