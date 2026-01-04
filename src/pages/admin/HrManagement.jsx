import { useEffect, useState } from "react";
import { getAllHrs, createHr } from "../../services/hrService";
import HrList from "./HrList";
import HrCreateModal from "./HrCreateModal";
import "../../styles/hr.css";

function HrManagement() {
  const [hrs, setHrs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const loadHrs = async () => {
    const data = await getAllHrs();
    setHrs(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadHrs();
  }, []);

  const handleCreateHr = async (formData) => {
    await createHr(formData);
    setShowModal(false);
    loadHrs();
  };

  return (
    <div className="hr-page">
      <div className="hr-header">
        <h2>HR Management</h2>
        <button onClick={() => setShowModal(true)}>+ Add HR</button>
      </div>

      <HrList hrs={hrs} />

      {showModal && (
        <HrCreateModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateHr}
        />
      )}
    </div>
  );
}

export default HrManagement;
