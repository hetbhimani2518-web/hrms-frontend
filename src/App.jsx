import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomeRedirect from "./routes/HomeRedirect";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";

import HrManagement from "./pages/admin/HrManagement";
import ManagerManagement from "./pages/admin/ManagerManagement";

import HrCreate from "./pages/admin/Create/HrCreate";
import ManagerCreate from "./pages/admin/Create/ManagerCreate";

import HrEdit from "./pages/admin/Edit/HrEdit";
import ManagerEdit from "./pages/admin/Edit/ManagerEdit";

import HrDashboard from "./pages/hr/HrDashboard";
import ManagerDashboard from "./pages/manager/ManagerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<Login />} />

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

        <Route
          path="/hr"
          element={
            <ProtectedRoute allowedRoles={["ROLE_HR"]}>
              <HrDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["ROLE_MANAGER"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
