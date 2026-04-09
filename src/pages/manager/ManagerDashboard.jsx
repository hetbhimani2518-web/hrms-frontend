import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { getManagerDashboardStats } from "../../api/dashboardService";

function ManagerDashboard() {
  const { auth } = useAuth();
  const [stats, setStats] = useState({ totalEmployees: 0, pendingLeaves: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await getManagerDashboardStats();
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome Manager</h2>
      <p>Email: {auth?.email}</p>
      <div className="stats-grid" style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div className="stat-card" style={{ padding: '20px', background: '#cff4fc', borderRadius: '8px', minWidth: '150px' }}>
          <h4>Active Employees</h4>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#055160' }}>{stats.totalEmployees}</span>
        </div>
        <div className="stat-card" style={{ padding: '20px', background: '#fff3cd', borderRadius: '8px', minWidth: '150px' }}>
          <h4>Pending Leaves</h4>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#664d03' }}>{stats.pendingLeaves}</span>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;