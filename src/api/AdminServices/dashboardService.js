import api from "../axios";

export const getAdminDashboardStats = () =>
  api.get("/admin/dashboard/stats");