import { useAuth } from "../../auth/AuthContext";

function AdminDashboard() {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
