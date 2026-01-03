import axios from "axios";
import "../../styles/admin.css";
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
    
    <div className="admin-page">

      <div className="admin-navbar">
        <h2>HRMS Admin</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="admin-body">
        <div className="admin-sidebar">
          <ul>
            <li className="active">Dashboard</li>
            <li>Employees</li>
            <li>Departments</li>
            <li>Leave Requests</li>
            <li>Settings</li>
          </ul>
        </div>

        <div className="admin-content">

          <h2>Dashboard Overview</h2>
          <p style={{ opacity: 0.8, marginBottom: "20px" }}>
            Welcome back, Admin 
          </p>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Employees</h3>
              <p>128</p>
            </div>

            <div className="stat-card">
              <h3>Departments</h3>
              <p>6</p>
            </div>

            <div className="stat-card">
              <h3>Pending Leaves</h3>
              <p>14</p>
            </div>

            <div className="stat-card">
              <h3>Active HR</h3>
              <p>4</p>
            </div>
          </div>

        </div>
      </div>

    </div>    
  );
}

export default AdminDashboard;
