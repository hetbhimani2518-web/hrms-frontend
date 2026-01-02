import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

function AdminDashboard() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/auth/logout", {
        refreshToken: auth.refreshToken,
      });
    } catch (e) {
      console.error("Logout API failed", e);
    } finally {
      logout();
      navigate("/login");
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
