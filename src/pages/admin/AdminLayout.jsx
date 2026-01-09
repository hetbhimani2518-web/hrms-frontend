import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import api from "../../api/axios";
import "../../styles/admin.css";

function AdminLayout() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (auth?.refreshToken) {
        await api.post("/auth/logout", {
          refreshToken: auth.refreshToken,
        });
      }
    } catch (e) {
      console.error("Logout failed", e);
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
            <li>
              <NavLink to="/admin" end className="nav-link">
                📊 <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/hr" className="nav-link">
                👥 <span>HR Management</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/employees" className="nav-link">
                🧑‍💼 <span>Employees</span>
              </NavLink>
            </li>
          </ul>
        </div>
      
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
