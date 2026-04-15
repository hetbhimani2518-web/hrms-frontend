import api from "../axios";

/* EMPLOYEE */

export const applyLeave = (data) =>
  api.post("/employee/leave", data);

export const getEmployeeLeaves = () =>
  api.get("/employee/leave");


/* MANAGER */

export const getManagerLeaves = () =>
  api.get("/manager/leave");

export const approveLeaveByManager = (leaveId) =>
  api.patch(`/manager/leave/${leaveId}/approve`);

export const rejectLeaveByManager = (leaveId) =>
  api.patch(`/manager/leave/${leaveId}/reject`);


/* HR */

export const getHrLeaves = () =>
  api.get("/hr/leave");

export const approveLeaveByHr = (leaveId) =>
  api.patch(`/hr/leave/${leaveId}/approve`);

export const rejectLeaveByHr = (leaveId) =>
  api.patch(`/hr/leave/${leaveId}/reject`);