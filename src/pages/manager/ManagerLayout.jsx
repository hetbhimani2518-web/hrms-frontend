import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

function ManagerLayout() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (

    <div className="admin-layout">

      <header className="admin-header">
        <h2>Manager Dashboard</h2>

        <button onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="admin-main">

        <aside className="admin-sidebar">

          <NavLink to="/manager" end className="side-link">
            Dashboard
          </NavLink>

          <NavLink to="/manager/leave" className="side-link">
            Leave Approvals
          </NavLink>

        </aside>

        <section className="admin-content">
          <Outlet />
        </section>

      </div>

    </div>

  );
}

export default ManagerLayout;