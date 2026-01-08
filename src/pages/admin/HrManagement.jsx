/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { getAllHrs, createHr, disableHr } from "../../api/hrApi";
import HrList from "./HrList";
import HrCreateModal from "./HrCreateModal";
import HrEditModal from "./components/HrEditModal";
import ConfirmDialog from "../../components/ConfirmDialog";
import "../../styles/hr.css";

const ITEMS_PER_PAGE = 5;

function HrManagement() {
  const [hrs, setHrs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingHr, setEditingHr] = useState(null);
  const [confirmDisable, setConfirmDisable] = useState(null);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const loadHrs = async () => {
    const res = await getAllHrs();
    setHrs(res.data);
  };

  useEffect(() => {
    loadHrs();
  }, []);

  const handleCreateHr = async (formData) => {
    await createHr(formData);
    setShowModal(false);
    loadHrs();
  };

  const handleDisable = async () => {
    await disableHr(confirmDisable.id);
    setConfirmDisable(null);
    loadHrs();
  };

  const filteredHrs = hrs.filter((hr) =>
    hr.fullName.toLowerCase().includes(search.toLowerCase()) ||
    hr.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedHrs = filteredHrs.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="hr-page">
      <div className="hr-header">
        <h2>HR Management</h2>
        <button onClick={() => setShowModal(true)}>+ Add HR</button>
      </div>

      <input
        className="hr-search"
        placeholder="Search HR by name or email..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); 
        }}
      />

      <HrList
        hrs={paginatedHrs}
        onEdit={setEditingHr}
        onDisable={setConfirmDisable}
      />

      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button
          disabled={page * ITEMS_PER_PAGE >= filteredHrs.length}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {showModal && (
        <HrCreateModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateHr}
        />
      )}

      {editingHr && (
        <HrEditModal
          hr={editingHr}
          onClose={() => setEditingHr(null)}
          onUpdated={loadHrs}
        />
      )}

      {confirmDisable && (
        <ConfirmDialog
          title="Disable HR"
          message="Are you sure you want to disable this HR?"
          onConfirm={handleDisable}
          onCancel={() => setConfirmDisable(null)}
        />
      )}
    </div>
  );
}

export default HrManagement;
