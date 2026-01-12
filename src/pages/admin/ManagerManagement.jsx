/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllManagers,
  deleteManager,
  disableManager
} from "../../api/AdminServices/managerService";
import "../../styles/manager.css";

export default function ManagerManagement() {
  const [managers, setManagers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadManagers();
  }, []);

  const loadManagers = async () => {
    const res = await getAllManagers();
    setManagers(res.data); 
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete Manager?")) {
      await deleteManager(id);
      loadManagers();
    }
  };

  const handleDisable = async (id) => {
    await disableManager(id);
    loadManagers();
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
    <div className="manager-page">
      <div className="manager-card">
        <div className="manager-header">
          <h2 className="manager-title">MANAGER Management</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/manager/create")}
          >
            + Add MANAGER
          </button>
        </div>

        <div className="table-wrapper">
          <table className="manager-table">
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
              {managers.map((manager) => (
                <tr key={manager.id}>
                  <td>{manager.email}</td>
                  <td>{manager.fullName}</td>
                  <td>{manager.department}</td>
                  <td>{manager.designation}</td>
                  <td>{manager.phone}</td>
                  <td>{manager.joiningDate}</td>
                  <td>
                    <span
                      className={
                        manager.status === "ACTIVE"
                          ? "status-badge status-active"
                          : "status-badge status-inactive"
                      }
                    >
                      {manager.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="btn btn-outline"
                      onClick={() => navigate(`/admin/hr/edit/${manager.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleDisable(manager.id)}
                    >
                      Disable
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(manager.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {managers.length === 0 && (
                <tr>
                  <td colSpan="8" className="empty-row">
                    No MANAGER records found.
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
