/* eslint-disable react-hooks/immutability */
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllEmployee,
  deleteEmployee,
  disableEmployee
} from "../../api/HrServices/employeeService";
import "../../styles/hr.css";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { useToast } from "../../components/ToastContext";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedEmpId, setSelectedEmpId] = useState(null);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const loadEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllEmployee({ search, page, size: 8 });
      setEmployees(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      addToast("Failed to load Employee data", "error");
    } finally {
      setLoading(false);
    }
  }, [search, page, addToast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadEmployees();
    }, 400);
    return () => clearTimeout(timer);
  }, [loadEmployees]);

  const openModal = (id, type) => {
    setSelectedEmpId(id);
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmpId(null);
    setModalType(null);
  };

  const handleConfirmAction = async () => {
    try {
      if (modalType === 'delete') {
        await deleteEmployee(selectedEmpId);
        addToast("Employee deleted successfully", "success");
      } else {
        await disableEmployee(selectedEmpId);
        addToast("Employee account disabled", "warning");
      }
      loadEmployees();
    } catch (err) {
      addToast("Operation failed", "error");
    } finally {
      closeModal();
    }
  };

  return (
    <div className="hr-page">
      <div className="hr-card">
        <div className="hr-header">
          <div className="hr-header-left">
            <h2 className="hr-title">Employee Management</h2>
            <SearchBar value={search} onChange={(val) => { setSearch(val); setPage(0); }} />
          </div>
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
                <th>Status</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr><td colSpan="7" className="empty-row">Loading...</td></tr>
              ) : employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.email}</td>
                    <td>{emp.fullName}</td>
                    <td>{emp.department}</td>
                    <td>{emp.designation}</td>
                    <td>{emp.phone}</td>
                    <td>
                      <span className={`status-badge ${emp.status === "ACTIVE" ? "status-active" : "status-inactive"}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button className="btn btn-outline" onClick={() => navigate(`/hr/employee/edit/${emp.id}`)}>Edit</button>
                      <button className="btn btn-warning" onClick={() => openModal(emp.id, 'disable')}>Disable</button>
                      <button className="btn btn-danger" onClick={() => openModal(emp.id, 'delete')}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" className="empty-row">No Employee records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination 
          currentPage={page} 
          totalPages={totalPages} 
          onPageChange={setPage} 
        />
      </div>

      <ConfirmationDialog 
        isOpen={showModal}
        title={modalType === 'delete' ? "Delete Employee" : "Disable Employee"}
        message={modalType === 'delete' 
          ? "Are you sure you want to permanently delete this Employee?" 
          : "Are you sure you want to disable this Employee account?"
        }
        confirmText={modalType === 'delete' ? "Delete" : "Disable"}
        confirmColor={modalType === 'delete' ? "var(--danger)" : "var(--warning)"}
        onConfirm={handleConfirmAction}
        onCancel={closeModal}
      />
    </div>
  );
}
