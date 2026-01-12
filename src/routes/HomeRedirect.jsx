import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

// const HomeRedirect = () => {
//   const { auth } = useAuth();

//   if (!auth || !auth.roles) {
//     return <Navigate to="/login" replace />;
//   }

//   if (auth.roles.includes("ROLE_ADMIN")) {
//     return <Navigate to="/admin" replace />;
//   }

//   if (auth.roles.includes("ROLE_HR")) {
//     return <Navigate to="/hr" replace />;
//   }

// };

const roleRedirectMap = {
  ROLE_ADMIN: "/admin",
  ROLE_HR: "/hr",
  ROLE_MANAGER: "/manager",
};

const HomeRedirect = () => {
  const { auth } = useAuth();

  if (!auth || !Array.isArray(auth.roles) || auth.roles.length === 0) {
    return <Navigate to="/login" replace />;
  }

  const destination =
    auth.roles
      .map((role) => roleRedirectMap[role])
      .find(Boolean) || "/login";

  return <Navigate to={destination} replace />;
};

export default HomeRedirect;
