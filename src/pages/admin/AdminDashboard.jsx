/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Users, UserCheck, Building2, Settings } from "lucide-react";
import "../../styles/admin.css";
import { getAdminDashboardStats } from "../../api/dashboardService";

/* Animated Counter */
function Counter({ end }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;

    if (!end) {
      setCount(0);
      return;
    }

    const step = Math.ceil(end / (duration / 16));

    const interval = setInterval(() => {
      start += step;

      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [end]);

  return <span>{count}</span>;
}

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalHrs: 0,
    totalManagers: 0,
    totalEmployees: 0,
    activeEmployees: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await getAdminDashboardStats();
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome, Admin</h2>

      <p className="dashboard-sub">
        Manage HRs, Managers and system settings
      </p>

      <div className="stats-grid">

        <div className="stat-card blue">
          <div className="stat-icon blue">
            <Users size={22} />
          </div>
          <h4>Total HRs</h4>
          <Counter end={stats.totalHrs} />
        </div>

        <div className="stat-card tyle">
          <div className="stat-icon tyle">
            <Users size={22} />
          </div>
          <h4>Total Managers</h4>
          <Counter end={stats.totalManagers} />
        </div>

        <div className="stat-card purple">
          <div className="stat-icon purple">
            <Users size={22} />
          </div>
          <h4>Total Employees</h4>
          <Counter end={stats.totalEmployees} />
        </div>

        <div className="stat-card green">
          <div className="stat-icon green">
            <UserCheck size={22} />
          </div>
          <h4>Active Employees</h4>
          <Counter end={stats.activeEmployees} />
        </div>

        <div className="stat-card purple">
          <div className="stat-icon purple">
            <Building2 size={22} />
          </div>
          <h4>Departments</h4>
          <Counter end={6} />
        </div>

        <div className="stat-card orange">
          <div className="stat-icon orange">
            <Settings size={22} />
          </div>
          <h4>System Status</h4>
          <span>Running</span>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;