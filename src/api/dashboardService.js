import api from "./axios";

export const getEmployeeDashboardStats = () =>
  api.get("/employee/dashboard/stats");

export const getManagerDashboardStats = () =>
  api.get("/manager/dashboard/stats");

export const getHrDashboardStats = () =>
  api.get("/hr/dashboard/stats");
