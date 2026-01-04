import api from "../api/axios";

export const getAllHrs = async () => {
  const res = await api.get("/admin/hr");
  return res.data;
};

export const createHr = async (hrData) => {
  const res = await api.post("/admin/hr", hrData);
  return res.data;
};
