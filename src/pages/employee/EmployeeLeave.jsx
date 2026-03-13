/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { applyLeave, getEmployeeLeaves } from "../../api/LeaveServices/leaveService";

function EmployeeLeave() {

  const [leaves, setLeaves] = useState([]);

  const [form, setForm] = useState({
    employeeId: "",
    leaveType: "SICK",
    startDate: "",
    endDate: "",
    reason: ""
  });

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    const res = await getEmployeeLeaves();
    setLeaves(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await applyLeave(form);

    setForm({
      employeeId: "",
      leaveType: "SICK",
      startDate: "",
      endDate: "",
      reason: ""
    });

    loadLeaves();
  };

  return (
    <div>

      <h2>Apply Leave</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={(e) =>
            setForm({ ...form, employeeId: e.target.value })
          }
        />

        <select
          value={form.leaveType}
          onChange={(e) =>
            setForm({ ...form, leaveType: e.target.value })
          }
        >
          <option value="SICK">SICK</option>
          <option value="CASUAL">CASUAL</option>
          <option value="ANNUAL">ANNUAL</option>
        </select>

        <input
          type="date"
          value={form.startDate}
          onChange={(e) =>
            setForm({ ...form, startDate: e.target.value })
          }
        />

        <input
          type="date"
          value={form.endDate}
          onChange={(e) =>
            setForm({ ...form, endDate: e.target.value })
          }
        />

        <textarea
          placeholder="Reason"
          value={form.reason}
          onChange={(e) =>
            setForm({ ...form, reason: e.target.value })
          }
        />

        <button type="submit">Apply</button>

      </form>

      <h2>My Leave Requests</h2>

      <table>

        <thead>
          <tr>
            <th>Type</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {leaves.map((l) => (

            <tr key={l.id}>

              <td>{l.leaveType}</td>
              <td>{l.startDate}</td>
              <td>{l.endDate}</td>
              <td>{l.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeLeave;