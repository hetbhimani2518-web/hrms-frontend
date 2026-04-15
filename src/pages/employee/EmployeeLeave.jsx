/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { applyLeave, getEmployeeLeaves } from "../../api/LeaveServices/leaveService";
import "../../styles/hr.css"; 
import { useToast } from "../../components/ToastContext"; 

function EmployeeLeave() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    leaveType: "SICK",
    startDate: "",
    endDate: "",
    reason: ""
  });
  const { addToast } = useToast();

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const res = await getEmployeeLeaves();
      setLeaves(res.data);
    } catch(e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await applyLeave(form);
      setForm({
        leaveType: "SICK",
        startDate: "",
        endDate: "",
        reason: ""
      });
        addToast("Leave request successfully submitted!", "success");
        loadLeaves();
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || "Application failed. Ensure dates are strictly valid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hr-page" style={{ flexDirection: 'column', gap: '30px', display: 'flex', paddingBottom: '40px', position: 'relative' }}>
      


      {/* Leave Application Form Card */}
      <div className="hr-card" style={{ maxWidth: '850px', margin: '0' }}>
        <div className="hr-header">
          <h2 className="hr-title">Apply For Leave</h2>
        </div>
        
        {error && <div style={{ background: 'var(--danger)', color: 'white', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontWeight: '500' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) minmax(300px, 2fr)', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Leave Type</label>
              <select
                value={form.leaveType}
                onChange={(e) => setForm({ ...form, leaveType: e.target.value })}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}
              >
                <option value="SICK">Sick Leave</option>
                <option value="CASUAL">Casual Leave</option>
                <option value="ANNUAL">Annual Leave</option>
                <option value="MATERNITY">Maternity Leave</option>
                <option value="PATERNITY">Paternity Leave</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Reason (Optional)</label>
              <input
                type="text"
                placeholder="Briefly describe your reason..."
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                style={{ width: '100%', padding: '12px', borderRadius: '10px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Start Date</label>
              <input
                type="date"
                value={form.startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '10px' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>End Date</label>
              <input
                type="date"
                value={form.endDate}
                min={form.startDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '10px' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              marginTop: '10px', 
              width: '100%', 
              maxWidth: '240px',
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              padding: '14px 20px',
              borderRadius: '10px',
              fontWeight: '600',
              cursor: 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'filter 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(1)'}
          >
            {loading ? "Submitting Request..." : "Submit Leave Request"}
          </button>
        </form>
      </div>

      {/* Leave History Table Card */}
      <div className="hr-card" style={{ maxWidth: '1000px', margin: '0' }}>
        <div className="hr-header">
          <h2 className="hr-title">My Leave History</h2>
        </div>

        <div className="table-wrapper">
          <table className="hr-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status Track</th>
                <th style={{ width: '50px' }}></th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((l) => (
                <tr key={l.id}>
                  <td style={{ fontWeight: 500 }}>{l.leaveType}</td>
                  <td>{l.startDate}</td>
                  <td>{l.endDate}</td>
                  <td>{l.reason || "-"}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        l.status.includes("APPROVED") 
                          ? "status-active" 
                          : l.status.includes("REJECTED") 
                            ? "status-inactive" 
                            : ""
                      }`}
                      style={l.status === 'PENDING' ? { background: 'rgba(245, 158, 11, 0.2)', color: '#d97706', border: '1px solid currentColor' } : {}}
                    >
                      {l.status}
                    </span>
                  </td>
                  <td>
                    <div className="info-icon-wrapper">
                      ℹ️
                      <div className="info-popup">
                        <strong style={{ display: 'block', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px', color: 'var(--accent)' }}>Approval Audit</strong>
                        {l.managerName ? (
                          <p style={{ margin: '4px 0' }}>
                            <strong>Manager ({l.managerName}): </strong> <br/>
                            <span style={{ color: 'var(--text-muted)' }}>{l.managerApprovedAt ? new Date(l.managerApprovedAt).toLocaleString() : 'N/A'}</span>
                          </p>
                        ) : (
                          <p style={{ margin: '4px 0', color: 'var(--text-muted)' }}>No Manager Interaction yet.</p>
                        )}
                        {l.hrName ? (
                          <p style={{ margin: '12px 0 4px' }}>
                            <strong>HR ({l.hrName}): </strong> <br/>
                            <span style={{ color: 'var(--text-muted)' }}>{l.hrApprovedAt ? new Date(l.hrApprovedAt).toLocaleString() : 'N/A'}</span>
                          </p>
                        ) : (
                          <p style={{ margin: '12px 0 4px', color: 'var(--text-muted)' }}>No HR Interaction yet.</p>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {leaves.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-row" style={{ padding: '30px' }}>No leave application records found. Take a break!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLeave;