import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

function EmployeeLayout() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (

    <div className="admin-layout">

      <header className="admin-header">
        <h2>Employee Portal</h2>

        <button onClick={handleLogout}>
          Logout
        </button>
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