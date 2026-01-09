import api from "./axios";

export const createHr = (data) =>
  api.post("/admin/hr", data);

export const getAllHrs = () =>
  api.get("/admin/hr");

export const getHrById = (id) =>
  api.get(`/admin/hr/${id}`);

export const updateHr = (id, data) =>
  api.put(`/admin/hr/${id}`, data);

export const disableHr = (id) =>
  api.patch(`/admin/hr/${id}/disable`);

export const deleteHr = (id) =>
  api.delete(`/admin/hr/${id}`);
