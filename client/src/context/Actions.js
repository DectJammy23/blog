export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const Logout = () => ({
  type: "LOGOUT",
});

export const UpdateStart = (userCredentials) => ({
  type: "UPDATE_START",
});

export const UpdateSuccess = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});

export const UpdateFailure = () => ({
  type: "UPDATE_FAILURE",
});

export const getStaffStart = () => ({type: "GET_STAFF_START"})
export const getStaffSuccess = (staff) => ({type: "GET_STAFF_SUCCESS"})
export const getStaffFailure = () => ({type: "GET_STAFF_FAILURE"})
export const getAllButStaffStart = () => ({type: "GET_ALL_BUT_STAFF_START"})
export const getAllButStaffSuccess = (nonStaffMembers) => ({type: "GET_ALL_BUT_STAFF_SUCCESS"})
export const getAllButStaffFailure = () => ({type: "GET_ALL_BUT_STAFF_FAILURE"})
export const AUTH = 'AUTH';
