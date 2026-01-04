function HrList({ hrs }) {
  return (
    <table className="hr-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {hrs.map(hr => (
          <tr key={hr.id}>
            <td>{hr.fullName}</td>
            <td>{hr.email}</td>
            <td>{hr.department}</td>
            <td>
              <span className={hr.status === "ACTIVE" ? "status-active" : "status-disabled"}>
                {hr.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default HrList;
