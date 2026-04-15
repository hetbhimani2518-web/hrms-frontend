import api from "../axios";

export const createManager = (data) =>
  api.post("/admin/manager", data);

export const getAllManagers = (params) =>
  api.get("/admin/manager", { params });

export const getManagerById = (id) =>
  api.get(`/admin/manager/${id}`);

export const updateManager = (id, data) =>
  api.put(`/admin/manager/${id}`, data);

export const disableManager = (id) =>
  api.patch(`/admin/manager/${id}/disable`);

export const deleteManager = (id) =>
  api.delete(`/admin/manager/${id}`);