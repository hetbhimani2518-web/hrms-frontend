import api from "../axios";

/* EMPLOYEE */

export const applyLeave = (data) =>
  api.post("/employee/leave/apply", data);

export const getEmployeeLeaves = () =>
  api.get("/employee/leave");


/* MANAGER */

export const getManagerLeaves = () =>
  api.get("/manager/leave");

export const approveLeaveByManager = (leaveId, managerId) =>
  api.patch(`/manager/leave/${leaveId}/approve/${managerId}`);

export const rejectLeaveByManager = (leaveId, managerId) =>
  api.patch(`/manager/leave/${leaveId}/reject/${managerId}`);


/* HR */

export const getHrLeaves = () =>
  api.get("/hr/leave");

export const approveLeaveByHr = (leaveId, hrId) =>
  api.patch(`/hr/leave/${leaveId}/approve/${hrId}`);

export const rejectLeaveByHr = (leaveId, hrId) =>
  api.patch(`/hr/leave/${leaveId}/reject/${hrId}`);