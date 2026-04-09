import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import api from "../../api/axios";
import ThemeToggle from "../../theme/ThemeToggle";

function EmployeeLayout() {


  const { auth,logout } = useAuth();
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

    <div className="admin-layout">

      <header className="admin-header">
        <h2>Employee Portal</h2>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <ThemeToggle />
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="admin-main">

        <aside className="admin-sidebar">

          <NavLink to="/employee" end className="side-link">
            Dashboard
          </NavLink>

          <NavLink to="/employee/leave" className="side-link">
            Apply Leave
          </NavLink>

        </aside>

        <section className="admin-content">
          <Outlet />
        </section>

      </div>

    </div>

  );
}

export default EmployeeLayout;