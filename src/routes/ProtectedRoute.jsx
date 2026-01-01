import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = allowedRoles.some(role =>
    auth.roles.includes(role)
  );

  return hasAccess ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
