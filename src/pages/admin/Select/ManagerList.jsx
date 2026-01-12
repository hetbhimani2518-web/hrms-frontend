/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllManagers,
  deleteManager,
} from "../../../api/AdminServices/managerService";

export default function ManagerList() {
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
    if (window.confirm("Delete this MANAGER?")) {
      await deleteManager(id);
      loadManagers();
    }
  };

  // const handleStatus = async (id) => {
  //   await toggleHrStatus(id);
  //   loadHrs();
  // };

  return (
    // <div>
    //   <h2>HR Management</h2>

    //   <button onClick={() => navigate("/admin/hr/create")}>
    //     + Add HR
    //   </button>

    //   <table border="1" cellPadding="8">
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
    //             {/* <button onClick={() => handleStatus(hr.id)}>
    //               Toggle
    //             </button> */}
    //             <button onClick={() => navigate(`/admin/hr/edit/${hr.id}`)}>
    //               Edit
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
      <div className="manager-header">
        <h2>MANAGER Management</h2>
        <button
          className="primary-btn"
          onClick={() => navigate("/admin/manager/create")}
        >
          + Add MANAGER
        </button>
      </div>

      <table className="manager-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {managers.map((manager) => (
            <tr key={manager.id}>
              <td>{manager.fullName}</td>
              <td>{manager.email}</td>
              <td>{manager.department}</td>
              <td>
                <span className={`status ${manager.status.toLowerCase()}`}>
                  {manager.status}
                </span>
              </td>
              <td className="actions">
                <button onClick={() => navigate(`/admin/manager/edit/${manager.id}`)}>
                  Edit
                </button>
                {/* <button onClick={() => handleDisable(hr.id)}>Disable</button> */}
                <button className="danger" onClick={() => handleDelete(manager.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}