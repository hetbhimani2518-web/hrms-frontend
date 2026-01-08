import { useState } from "react";
import { createHr } from "../../api/hrApi";

function HrCreateModal({ onSuccess }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.loading(true);
    setError("");
    try {
      await createHr(form);
      onSuccess();
      setForm({
        email: "",
        password: "",
        fullName: "",
        phone: "",
        department: "",
        designation: "",
        joiningDate: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create HR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}

      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <input name="fullName" placeholder="Full Name" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="department" placeholder="Department" onChange={handleChange} />
      <input name="designation" placeholder="Designation" onChange={handleChange} />
      <input name="joiningDate" type="date" onChange={handleChange} />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create HR"}
      </button>
    </form>
  );
}

export default HrCreateModal;