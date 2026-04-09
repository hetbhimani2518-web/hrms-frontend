import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllEmployee,
  deleteEmployee,
  disableEmployee
} from "../../api/HrServices/employeeService";
import "../../styles/hr.css"; // We'll inherit the same styles for now, later mapped to themes

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await getAllEmployee();
      setEmployees(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete Employee?")) {
      await deleteEmployee(id);
      loadEmployees();
    }
  };

  const handleDisable = async (id) => {
    await disableEmployee(id);
    loadEmployees();
  };

  return (
    <div className="hr-page">
      <div className="hr-card">
        <div className="hr-header">
          <h2 className="hr-title">Employee Management</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/hr/employee/create")}
          >
            + Add Employee
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
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.email}</td>
                  <td>{emp.fullName}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.joiningDate}</td>
                  <td>
                    <span
                      className={
                        emp.status === "ACTIVE"
                          ? "status-badge status-active"
                          : "status-badge status-inactive"
                      }
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="btn btn-outline"
                      onClick={() => navigate(`/hr/employee/edit/${emp.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleDisable(emp.id)}
                    >
                      Disable
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {employees.length === 0 && (
                <tr>
                  <td colSpan="8" className="empty-row">
                    No Employee records found.
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
