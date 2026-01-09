import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHr } from "../../../api/hrService";

function HrCreateModal( ) {
  
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createHr(form);
    navigate("/admin/hr");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add HR</h3>

        <form onSubmit={handleSubmit}>
          <input name="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" placeholder="Password" onChange={handleChange} required />
          <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="department" placeholder="Department" onChange={handleChange} />
          <input name="designation" placeholder="Designation" onChange={handleChange} />
          <input type="date" name="joiningDate" onChange={handleChange} />

          <div className="modal-actions">
            <button type="submit">Create</button>            
          </div>
        </form>
      </div>
    </div>
  );
}

export default HrCreateModal;
