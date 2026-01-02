import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const HomeRedirect = () => {
  const { auth } = useAuth();

  if (!auth || !auth.roles) {
    return <Navigate to="/login" replace />;
  }

  if (auth.roles.includes("ROLE_ADMIN")) {
    return <Navigate to="/admin" replace />;
  }

  if (auth.roles.includes("ROLE_HR")) {
    return <Navigate to="/hr" replace />;
  }

  if (auth.roles.includes("ROLE_MANAGER")) {
    return <Navigate to="/manager" replace />;
  }

  return <Navigate to="/employee" replace />;
};

export default HomeRedirect;
