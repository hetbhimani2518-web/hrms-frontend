import api from "../axios";

const BASE = "/hr/employee";

export const createEmployee = (data) => 
  api.post(`${BASE}/create`, data);

export const getAllEmployee = () => 
  api.get(BASE);

export const getEmployeeById = (id) => 
  api.get(`${BASE}/get/${id}`);

export const updateEmployee = (id, data) => 
  api.put(`${BASE}/edit/${id}`, data);

export const disableEmployee = (id) => 
  api.patch(`${BASE}/${id}/disable`);

export const deleteEmployee = (id) => 
  api.delete(`${BASE}/delete/${id}`);