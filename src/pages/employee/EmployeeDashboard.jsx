import { useAuth } from "../../auth/AuthContext";

function EmployeeDashboard() {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default EmployeeDashboard;
