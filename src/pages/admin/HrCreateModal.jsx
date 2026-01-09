import { useState } from "react";

function HrCreateModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onCreate(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add HR</h3>

        <form onSubmit={handleSubmit}>
          <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" placeholder="Password" onChange={handleChange} required />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="department" placeholder="Department" onChange={handleChange} />
          <input name="designation" placeholder="Designation" onChange={handleChange} />
          <input type="date" name="joiningDate" onChange={handleChange} />

          <div className="modal-actions">
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HrCreateModal;
