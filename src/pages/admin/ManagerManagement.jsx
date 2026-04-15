/* eslint-disable react-hooks/immutability */
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllManagers,
  deleteManager,
  disableManager
} from "../../api/AdminServices/managerService";
import "../../styles/hr.css"; // Reuse HR styles for consistency
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { useToast } from "../../components/ToastContext";

export default function ManagerManagement() {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedManagerId, setSelectedManagerId] = useState(null);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const loadManagers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllManagers({ search, page, size: 8 });
      setManagers(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      addToast("Failed to load Manager data", "error");
    } finally {
      setLoading(false);
    }
  }, [search, page, addToast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadManagers();
    }, 400);
    return () => clearTimeout(timer);
  }, [loadManagers]);

  const openModal = (id, type) => {
    setSelectedManagerId(id);
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedManagerId(null);
    setModalType(null);
  };

  const handleConfirmAction = async () => {
    try {
      if (modalType === 'delete') {
        await deleteManager(selectedManagerId);
        addToast("Manager deleted successfully", "success");
      } else {
        await disableManager(selectedManagerId);
        addToast("Manager account disabled", "warning");
      }
      loadManagers();
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
            <h2 className="hr-title">Manager Management</h2>
            <SearchBar value={search} onChange={(val) => { setSearch(val); setPage(0); }} />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/manager/create")}
          >
            + Add Manager
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
              ) : managers.length > 0 ? (
                managers.map((manager) => (
                  <tr key={manager.id}>
                    <td>{manager.email}</td>
                    <td>{manager.fullName}</td>
                    <td>{manager.department}</td>
                    <td>{manager.designation}</td>
                    <td>{manager.phone}</td>
                    <td>
                      <span className={`status-badge ${manager.status === "ACTIVE" ? "status-active" : "status-inactive"}`}>
                        {manager.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button className="btn btn-outline" onClick={() => navigate(`/admin/manager/edit/${manager.id}`)}>Edit</button>
                      <button className="btn btn-warning" onClick={() => openModal(manager.id, 'disable')}>Disable</button>
                      <button className="btn btn-danger" onClick={() => openModal(manager.id, 'delete')}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" className="empty-row">No Manager records found.</td></tr>
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
        title={modalType === 'delete' ? "Delete Manager" : "Disable Manager"}
        message={modalType === 'delete' 
          ? "Are you sure you want to permanently delete this Manager account?" 
          : "Are you sure you want to disable this Manager account?"
        }
        confirmText={modalType === 'delete' ? "Delete" : "Disable"}
        confirmColor={modalType === 'delete' ? "var(--danger)" : "var(--warning)"}
        onConfirm={handleConfirmAction}
        onCancel={closeModal}
      />
    </div>
  );
}
