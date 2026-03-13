import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomeRedirect from "./routes/HomeRedirect";

/* ADMIN */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HrManagement from "./pages/admin/HrManagement";
import ManagerManagement from "./pages/admin/ManagerManagement";
import HrCreate from "./pages/admin/Create/HrCreate";
import ManagerCreate from "./pages/admin/Create/ManagerCreate";
import HrEdit from "./pages/admin/Edit/HrEdit";
import ManagerEdit from "./pages/admin/Edit/ManagerEdit";

/* HR */
import HrLayout from "./pages/hr/HrLayout";
import HrDashboard from "./pages/hr/HrDashboard";
import HrLeave from "./pages/hr/HrLeave";

/* MANAGER */
import ManagerLayout from "./pages/manager/ManagerLayout";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerLeave from "./pages/manager/ManagerLeave";

/* EMPLOYEE */
import EmployeeLayout from "./pages/employee/EmployeeLayout";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeLeave from "./pages/employee/EmployeeLeave";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<HomeRedirect />} />

        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />

          <Route path="hr" element={<HrManagement />} />
          <Route path="hr/create" element={<HrCreate />} />
          <Route path="hr/edit/:id" element={<HrEdit />} />

          <Route path="manager" element={<ManagerManagement />} />
          <Route path="manager/create" element={<ManagerCreate />} />
          <Route path="manager/edit/:id" element={<ManagerEdit />} />
        </Route>

        {/* HR */}
        <Route
          path="/hr"
          element={
            <ProtectedRoute allowedRoles={["ROLE_HR"]}>
              <HrLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HrDashboard />} />

          <Route path="leave" element={<HrLeave />} />
        </Route>

        {/* MANAGER */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["ROLE_MANAGER"]}>
              <ManagerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ManagerDashboard />} />

          <Route path="leave" element={<ManagerLeave />} />
        </Route>

        {/* EMPLOYEE */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={["ROLE_EMPLOYEE"]}>
              <EmployeeLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployeeDashboard />} />

          <Route path="leave" element={<EmployeeLeave />} />
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;