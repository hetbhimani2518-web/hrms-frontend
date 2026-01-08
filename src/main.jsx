import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import { bindLoading } from "./api/api";

// eslint-disable-next-line react-refresh/only-export-components
const LoaderBinder = () => {
  const { setLoading } = useLoading();
  React.useEffect(() => {
    bindLoading(setLoading);
  }, [setLoading]);
  return null;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <LoadingProvider>
        <LoaderBinder />
        <App />
      </LoadingProvider>
    </AuthProvider>
  </BrowserRouter>
);
