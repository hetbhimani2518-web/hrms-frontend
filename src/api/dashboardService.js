import api from "./axios";

export const getAdminDashboardStats = () =>
  api.get("/admin/dashboard/stats");

export const getEmployeeDashboardStats = () =>
  api.get("/employee/dashboard/stats");

export const getManagerDashboardStats = () =>
  api.get("/manager/dashboard/stats");

export const getHrDashboardStats = () =>
  api.get("/hr/dashboard/stats");
