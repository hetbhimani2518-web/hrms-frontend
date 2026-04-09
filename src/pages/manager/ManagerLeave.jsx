/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import {
  getManagerLeaves,
  approveLeaveByManager,
  rejectLeaveByManager
} from "../../api/LeaveServices/leaveService";

function ManagerLeave() {

  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    const res = await getManagerLeaves();
    setLeaves(res.data);
  };

  const approve = async (id) => {
    await approveLeaveByManager(id);
    loadLeaves();
  };

  const reject = async (id) => {
    await rejectLeaveByManager(id);
    loadLeaves();
  };

  return (

    <div>

      <h2>Leave Requests</h2>

      <table>

        <thead>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {leaves.map((l) => (

            <tr key={l.id}>

              <td>{l.employeeName}</td>
              <td>{l.leaveType}</td>
              <td>{l.status}</td>

              <td>

                <button onClick={() => approve(l.id)}>
                  Approve
                </button>

                <button onClick={() => reject(l.id)}>
                  Reject
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default ManagerLeave;