import { useAuth } from "../../auth/AuthContext";

function ManagerDashboard() {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Manager Dashboard</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default ManagerDashboard;
