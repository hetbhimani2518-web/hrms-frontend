import api from "./api";

export const createHr = (data) => {
  return api.post("/admin/hr", data);
};

export const getAllHrs = () => {
  return api.get("/admin/hr");
};

export const updateHr = (id, data) => {
  return api.put(`/admin/hr/${id}`, data);
};

export const disableHr = (id) => {
  return api.patch(`/admin/hr/${id}/disable`);
};
