import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import api from "../../api/axios";
import ThemeToggle from "../../theme/ThemeToggle";
import NotificationBell from "../../components/NotificationBell";
import { useToast } from "../../components/ToastContext";

function HrLayout() {

  const { auth,logout } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

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
      addToast("Logged out successfully", "info");
      navigate("/login");
    }
  };

  return (
    <div className="admin-layout">

      <header className="admin-header">
        <h2>HR Dashboard</h2>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <NotificationBell />
          <ThemeToggle />
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="admin-main">

        <aside className="admin-sidebar">

          <NavLink to="/hr" end className="side-link">
            Dashboard
          </NavLink>

          <NavLink to="/hr/leave" className="side-link">
            Leave Requests
          </NavLink>

          <NavLink to="/hr/employee" className="side-link">
            Employees
          </NavLink>

        </aside>

        <section className="admin-content">
          <Outlet />
        </section>

      </div>
    </div>
  );
}

export default HrLayout;