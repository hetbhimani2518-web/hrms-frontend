/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEmployees, deleteEmployee } from "../../../api/HrServices/employeeService.js";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const res = await getAllEmployees();
    setEmployees(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this Employee?")) {
      await deleteEmployee(id);
      loadEmployees();
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

    <div className="hr-page">
      <div className="hr-header">
        <h2>Employee Management</h2>
        <button
          className="primary-btn"
          onClick={() => navigate("/hr/employee/create")}
        >
          + Add Employee
        </button>
      </div>

      <table className="hr-table">
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
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.fullName}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>
                <span className={`status ${employee.status.toLowerCase()}`}>
                  {employee.status}
                </span>
              </td>
              <td className="actions">
                <button onClick={() => navigate(`/hr/employee/edit/${employee.id}`)}>
                  Edit
                </button>
                {/* <button onClick={() => handleDisable(hr.id)}>Disable</button> */}
                <button className="danger" onClick={() => handleDelete(employee.id)}>
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
