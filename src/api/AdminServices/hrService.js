import api from "../axios";

export const createHr = (data) =>
  api.post("/admin/hr/create", data);

export const getAllHrs = () =>
  api.get("/admin/hr");

export const getHrById = (id) =>
  api.get(`/admin/hr/get/${id}`);

export const updateHr = (id, data) =>
  api.put(`/admin/hr/edit/${id}`, data);

export const disableHr = (id) =>
  api.patch(`/admin/hr/${id}/disable`);

export const deleteHr = (id) =>
  api.delete(`/admin/hr/delete/${id}`);
