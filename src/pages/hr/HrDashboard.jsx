import { useAuth } from "../../auth/AuthContext";

function HrDashboard() {
  const { logout } = useAuth();

  return (
    <div>
      <h2>HR Dashboard</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default HrDashboard;
