import api from "../axios";

export const createManager = (data) =>
  api.post("/admin/manager/create", data);

export const getAllManagers = () =>
  api.get("/admin/manager");

export const getManagerById = (id) =>
  api.get(`/admin/manager/get/${id}`);

export const updateManager = (id, data) =>
  api.put(`/admin/manager/edit/${id}`, data);

export const disableManager = (id) =>
  api.patch(`/admin/manager/${id}/disable`);

export const deleteManager = (id) =>
  api.delete(`/admin/manager/delete/${id}`);