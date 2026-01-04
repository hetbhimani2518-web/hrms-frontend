import { useEffect, useState } from "react";
import { fetchAdminStats } from "../../services/adminStatsService";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAdminStats().then(setStats);
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <>
      <h2>Dashboard Overview</h2>
      <p style={{ opacity: 0.8, marginBottom: "20px" }}>
        Welcome back, Admin
      </p>

      <div className="stats-grid">
        <StatCard title="Total Employees" value={stats.totalEmployees} />
        <StatCard title="Departments" value={stats.departments} />
        <StatCard title="Pending Leaves" value={stats.pendingLeaves} />
        <StatCard title="Active HR" value={stats.activeHr} />
      </div>
    </>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default AdminDashboard;
