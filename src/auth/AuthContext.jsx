/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(() => {
//     const stored = localStorage.getItem("auth");
//     return stored ? JSON.parse(stored) : null;
//   });

//   const login = (data) => {
//     setAuth(data);
//     localStorage.setItem("auth", JSON.stringify(data));
//   };

//   const logout = () => {
//     setAuth(null);
//     localStorage.removeItem("auth");
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const stored = localStorage.getItem("auth");
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem("auth");
      return null;
    }
  });

  const login = (data) => {
    setAuth(data);
    localStorage.setItem("auth", JSON.stringify(data));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  const value = { auth, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
