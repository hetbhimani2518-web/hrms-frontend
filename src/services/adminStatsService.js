import api from "../api/axios";

export const fetchAdminStats = async () => {
  const res = await api.get("/admin/stats");
  return res.data;
};