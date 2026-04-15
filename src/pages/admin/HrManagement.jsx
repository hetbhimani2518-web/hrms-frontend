/* eslint-disable react-hooks/immutability */
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllHrs,
  deleteHr,
  disableHr
} from "../../api/AdminServices/hrService";
import "../../styles/hr.css";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { useToast } from "../../components/ToastContext";

export default function HrManagement() {
  const [hrs, setHrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'delete' or 'disable'
  const [selectedHrId, setSelectedHrId] = useState(null);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const loadHrs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllHrs({ search, page, size: 8 });
      setHrs(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      addToast("Failed to load HR data", "error");
    } finally {
      setLoading(false);
    }
  }, [search, page, addToast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadHrs();
    }, 400); // Debounce search
    return () => clearTimeout(timer);
  }, [loadHrs]);

  const openModal = (id, type) => {
    setSelectedHrId(id);
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedHrId(null);
    setModalType(null);
  };

  const handleConfirmAction = async () => {
    try {
      if (modalType === 'delete') {
        await deleteHr(selectedHrId);
        addToast("HR deleted successfully", "success");
      } else {
        await disableHr(selectedHrId);
        addToast("HR account disabled", "warning");
      }
      loadHrs();
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
            <h2 className="hr-title">HR Management</h2>
            <SearchBar value={search} onChange={(val) => { setSearch(val); setPage(0); }} />
          </div>
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
                <th>Status</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr><td colSpan="7" className="empty-row">Loading...</td></tr>
              ) : hrs.length > 0 ? (
                hrs.map((hr) => (
                  <tr key={hr.id}>
                    <td>{hr.email}</td>
                    <td>{hr.fullName}</td>
                    <td>{hr.department}</td>
                    <td>{hr.designation}</td>
                    <td>{hr.phone}</td>
                    <td>
                      <span className={`status-badge ${hr.status === "ACTIVE" ? "status-active" : "status-inactive"}`}>
                        {hr.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button className="btn btn-outline" onClick={() => navigate(`/admin/hr/edit/${hr.id}`)}>Edit</button>
                      <button className="btn btn-warning" onClick={() => openModal(hr.id, 'disable')}>Disable</button>
                      <button className="btn btn-danger" onClick={() => openModal(hr.id, 'delete')}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" className="empty-row">No HR records found.</td></tr>
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
        title={modalType === 'delete' ? "Delete HR" : "Disable HR"}
        message={modalType === 'delete' 
          ? "Are you sure you want to permanently delete this HR account? This action cannot be undone." 
          : "Are you sure you want to disable this HR account? They will no longer be able to log in."
        }
        confirmText={modalType === 'delete' ? "Delete" : "Disable"}
        confirmColor={modalType === 'delete' ? "var(--danger)" : "var(--warning)"}
        onConfirm={handleConfirmAction}
        onCancel={closeModal}
      />
    </div>
  );
}
