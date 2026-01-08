/* eslint-disable no-unused-vars */
import { useState } from "react";
import { updateHr } from "../../../api/hrApi";

function HrEditModal({ hr, onClose, onUpdated }) {
  const [form, setForm] = useState({
    fullName: hr.fullName,
    phone: hr.phone,
    department: hr.department,
    designation: hr.designation,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updateHr(hr.id, form);
      onUpdated();
      onClose();
    } catch (err) {
      setError("Failed to update HR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit HR</h3>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input name="fullName" value={form.fullName} onChange={handleChange} />
          <input name="phone" value={form.phone} onChange={handleChange} />
          <input name="department" value={form.department} onChange={handleChange} />
          <input name="designation" value={form.designation} onChange={handleChange} />

          <div className="modal-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HrEditModal;
