import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { getEmployeeDashboardStats } from "../../api/dashboardService";

function EmployeeDashboard() {
  const { auth } = useAuth();
  const [stats, setStats] = useState({ totalLeaves: 0, approvedLeaves: 0, pendingLeaves: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await getEmployeeDashboardStats();
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {stats.fullName || 'Employee'}</h2>
      <p>Email: {auth?.email}</p>
      <div className="stats-grid" style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div className="stat-card" style={{ padding: '20px', borderRadius: '8px', minWidth: '150px' }}>
          <h4>Total Leaves</h4>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalLeaves}</span>
        </div>
        <div className="stat-card" style={{ padding: '20px', borderRadius: '8px', minWidth: '150px' }}>
          <h4>Approved Leaves</h4>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.approvedLeaves}</span>
        </div>
        <div className="stat-card" style={{ padding: '20px', borderRadius: '8px', minWidth: '150px' }}>
          <h4>Pending Leaves</h4>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.pendingLeaves}</span>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;