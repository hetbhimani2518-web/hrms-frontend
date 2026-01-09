/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHrById, updateHr } from "../../../api/hrService";

export default function HrEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    fullName: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: ""
  });

  useEffect(() => {
    loadHr();
  }, []);

  const loadHr = async () => {
    const res = await getHrById(id);
    setForm(res.data);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateHr(id, form);
    navigate("/admin/hr");
  };

  return (
    <div>
      <h2>Edit HR</h2>

      <form onSubmit={handleSubmit}>
        <input name="email" value={form.email} onChange={handleChange} />
        <input name="name" value={form.fullName} onChange={handleChange} />
        <input name="phone" value={form.phone} onChange={handleChange} />
        <input name="department" value={form.department} onChange={handleChange} />
        <input name="designation" value={form.designation} onChange={handleChange} />
        <input name="joiningDate" value={form.joiningDate} onChange={handleChange} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
