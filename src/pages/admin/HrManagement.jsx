/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllHrs,
  deleteHr,
  disableHr
} from "../../api/hrService";
import "../../styles/hr.css";

export default function HrManagement() {
  const [hrs, setHrs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadHrs();
  }, []);

  const loadHrs = async () => {
    const res = await getAllHrs();
    setHrs(res.data); 
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete HR?")) {
      await deleteHr(id);
      loadHrs();
    }
  };

  const handleDisable = async (id) => {
    await disableHr(id);
    loadHrs();
  };

  return (
    // <div>
    //   <h2>HR Management</h2>

    //   <button onClick={() => navigate("/admin/hr/create")}>
    //     + Add HR
    //   </button>

    //   <table border="1">
    //     <thead>
    //       <tr>
    //         <th>Email</th>
    //         <th>Name</th>
    //         <th>Department</th>
    //         <th>Designation</th>
    //         <th>Phone</th>
    //         <th>Joining Date</th>
    //         <th>Status</th>
    //         <th>Actions</th>
    //       </tr>
    //     </thead>

    //     <tbody>
    //       {hrs.map((hr) => (
    //         <tr key={hr.id}>
    //           <td>{hr.email}</td>
    //           <td>{hr.fullName}</td>
    //           <td>{hr.department}</td>
    //           <td>{hr.designation}</td>
    //           <td>{hr.phone}</td>
    //           <td>{hr.joiningDate}</td>
    //           <td>{hr.status}</td>
    //           <td>
    //             <button onClick={() => navigate(`/admin/hr/edit/${hr.id}`)}>
    //               Edit
    //             </button>
    //             <button onClick={() => handleDisable(hr.id)}>
    //               Disable
    //             </button>
    //             <button onClick={() => handleDelete(hr.id)}>
    //               Delete
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <div className="hr-page">
      <div className="hr-card">
        <div className="hr-header">
          <h2 className="hr-title">HR Management</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/hr/create")}
          >
            + Add HR
          </button>
        </div>

        <div className="table-wrapper">
          <table className="hr-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Phone</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {hrs.map((hr) => (
                <tr key={hr.id}>
                  <td>{hr.email}</td>
                  <td>{hr.fullName}</td>
                  <td>{hr.department}</td>
                  <td>{hr.designation}</td>
                  <td>{hr.phone}</td>
                  <td>{hr.joiningDate}</td>
                  <td>
                    <span
                      className={
                        hr.status === "ACTIVE"
                          ? "status-badge status-active"
                          : "status-badge status-inactive"
                      }
                    >
                      {hr.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="btn btn-outline"
                      onClick={() => navigate(`/admin/hr/edit/${hr.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleDisable(hr.id)}
                    >
                      Disable
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(hr.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {hrs.length === 0 && (
                <tr>
                  <td colSpan="8" className="empty-row">
                    No HR records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
