import "../../styles/admin.css";

function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total HRs</h3>
          <p>—</p>
        </div>

        <div className="stat-card">
          <h3>Total Employees</h3>
          <p>—</p>
        </div>

        <div className="stat-card">
          <h3>Active Users</h3>
          <p>—</p>
        </div>

        <div className="stat-card">
          <h3>System Status</h3>
          <p>Running</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
