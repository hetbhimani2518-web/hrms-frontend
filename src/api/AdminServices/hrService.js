import api from "../axios";

const BASE = "/admin/hr";

export const createHr = (data) => 
  api.post(`${BASE}/create`, data);

export const getAllHrs = () => 
  api.get(BASE);

export const getHrById = (id) => 
  api.get(`${BASE}/get/${id}`);

export const updateHr = (id, data) => 
  api.put(`${BASE}/edit/${id}`, data);

export const disableHr = (id) => 
  api.patch(`${BASE}/${id}/disable`);

export const deleteHr = (id) => 
  api.delete(`${BASE}/delete/${id}`);