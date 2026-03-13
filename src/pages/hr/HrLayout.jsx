import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

function HrLayout() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="admin-layout">

      <header className="admin-header">
        <h2>HR Dashboard</h2>

        <button onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="admin-main">

        <aside className="admin-sidebar">

          <NavLink to="/hr" end className="side-link">
            Dashboard
          </NavLink>

          <NavLink to="/hr/leave" className="side-link">
            Leave Requests
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