import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../../../api/HrServices/employeeService";
import "../../../styles/hr.css";
import { useToast } from "../../../components/ToastContext";

function EmployeeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      const res = await getEmployeeById(id);
      setForm({
        ...res.data
      });
    } catch (e) {
      alert("Failed to load Employee details.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateEmployee(id, form);
      addToast("Employee updated successfully!", "success");
      navigate("/hr/employee"); 
    } catch (e) {
      addToast(e.response?.data?.message || "Failed to update Employee", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h3>Edit Employee</h3>

        <form onSubmit={handleSubmit} className="form-grid">
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName || ""}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone || ""}
            onChange={handleChange}
          />
          <input
            name="department"
            placeholder="Department"
            value={form.department || ""}
            onChange={handleChange}
          />
          <input
            name="designation"
            placeholder="Designation"
            value={form.designation || ""}
            onChange={handleChange}
          />
          <input
            type="date"
            name="joiningDate"
            value={form.joiningDate || ""}
            onChange={handleChange}
          />

          <button className="primary-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Employee"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeEdit;
