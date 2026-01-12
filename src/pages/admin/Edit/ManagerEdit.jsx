/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getManagerById,
  updateManager,
} from "../../../api/AdminServices/managerService";
import "../../../styles/manager.css";

export default function ManagerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    fullName: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
  });

  useEffect(() => {
    loadManager();
  }, []);

  const loadManager = async () => {
    const res = await getManagerById(id);
    setForm(res.data);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateManager(id, form);
    navigate("/admin/manager");
  };

  return (
    // <div>
    //   <h2>Edit HR</h2>

    //   <form onSubmit={handleSubmit}>
    //     <input name="email" value={form.email} onChange={handleChange} />
    //     <input name="name" value={form.fullName} onChange={handleChange} />
    //     <input name="phone" value={form.phone} onChange={handleChange} />
    //     <input name="department" value={form.department} onChange={handleChange} />
    //     <input name="designation" value={form.designation} onChange={handleChange} />
    //     <input name="joiningDate" value={form.joiningDate} onChange={handleChange} />

    //     <button type="submit">Update</button>
    //   </form>
    // </div>
    <div className="form-wrapper">
      <div className="form-card">
        <h3>Edit Manager</h3>

        <form onSubmit={handleSubmit} className="form-grid">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
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

          <button className="primary-btn">Edit MANAGER</button>
        </form>
      </div>
    </div>
  );
}
