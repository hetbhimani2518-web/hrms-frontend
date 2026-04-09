import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { getHrDashboardStats } from "../../api/dashboardService";

function HrDashboard() {
  const { auth } = useAuth();
  const [stats, setStats] = useState({ totalEmployees: 0, pendingLeaves: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await getHrDashboardStats();
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome HR</h2>
      <p>Email: {auth?.email}</p>
      <div className="stats-grid" style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div className="stat-card" style={{ padding: '20px', background: '#e2e3e5', borderRadius: '8px', minWidth: '150px' }}>
          <h4>Active Employees</h4>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#41464b' }}>{stats.totalEmployees}</span>
        </div>
        <div className="stat-card" style={{ padding: '20px', background: '#fff3cd', borderRadius: '8px', minWidth: '150px' }}>
          <h4>Pending HR Review</h4>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#664d03' }}>{stats.pendingLeaves}</span>
        </div>
      </div>
    </div>
  );
}

export default HrDashboard;