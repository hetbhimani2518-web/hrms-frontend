import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHr } from "../../../api/hrService";
import "../../../styles/hr.css";

function HrCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createHr(form);
      navigate("/admin/hr");
    } catch (e) {
      alert(e.response?.data?.message || "Failed to create HR");
    }
  };

  return (
    <div className="form-wrapper">
      {/* <div className="modal">
        <h3>Add HR</h3>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input
            name="department"
            placeholder="Department"
            onChange={handleChange}
          />
          <input
            name="designation"
            placeholder="Designation"
            onChange={handleChange}
          />
          <input type="date" name="joiningDate" onChange={handleChange} />

          <div className="modal-actions">
            <button type="submit">Create</button>
          </div>
        </form>
      </div> */}

      <div className="form-card">
        <h3>Create HR</h3>

        <form onSubmit={handleSubmit} className="form-grid">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
          />
          <input
            name="designation"
            placeholder="Designation"
            value={form.designation}
            onChange={handleChange}
          />
          <input
            type="date"
            name="joiningDate"
            value={form.joiningDate || ""}
            onChange={handleChange}
          />

          <button className="primary-btn">
            Create HR
          </button>
        </form>
      </div>
    </div>
  );
}

export default HrCreate;
