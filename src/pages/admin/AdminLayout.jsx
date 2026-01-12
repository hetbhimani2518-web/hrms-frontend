import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import api from "../../api/axios";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Menu,
} from "lucide-react";
import "../../styles/admin.css";

function AdminLayout() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div
      className={`admin-layout ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <header className="admin-header">
        <div className="header-left">
          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu size={18} />
          </button>
          <h2>HRMS Admin</h2>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="admin-main">
        <aside
          className="admin-sidebar"
          onMouseEnter={() => collapsed && !isMobile && setCollapsed(false)}
          onMouseLeave={() => !isMobile && setCollapsed(true)}
        >
          <NavLink to="/admin" end className="side-link">
            <span className="link-icon">
              <LayoutDashboard size={20} />
            </span>
            <span className="link-text">Dashboard</span>
          </NavLink>

          <NavLink to="/admin/hr" className="side-link">
            <span className="link-icon">
              <UserCog size={20} />
            </span>
            <span className="link-text">HR Management</span>
          </NavLink>

          <NavLink to="/admin/manager" className="side-link">
            <span className="link-icon">
              <UserCog size={20} />
            </span>
            <span className="link-text">MANAGER Management</span>
          </NavLink>

        </aside>

        <section className="admin-content">
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default AdminLayout;
