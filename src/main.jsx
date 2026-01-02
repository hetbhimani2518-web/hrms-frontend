import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { setupInterceptors } from "./api/axiosInterceptor";

// eslint-disable-next-line react-refresh/only-export-components
const InterceptorWrapper = ({ children }) => {
  const { auth, login, logout } = useAuth();

  setupInterceptors(auth, login, logout);

  return children;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <InterceptorWrapper>
      <App />
    </InterceptorWrapper>
  </AuthProvider>
);