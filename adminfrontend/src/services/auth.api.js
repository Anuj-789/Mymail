import api from "./api";

// Register

export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

// Login

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

// Verify Email

export const verifyEmail = async (token) => {
  const response = await api.get(`/auth/verify-email/${token}`);

  return response.data;
};

// Forgot Password

export const forgotPassword = async (data) => {
  const response = await api.post("/auth/forgot-password", data);

  return response.data;
};

// Reset Password

export const resetPassword = async (token, data) => {
  const response = await api.post(
    `/auth/reset-password/${token}`,
    data,
  );

  return response.data;
};

// Logout

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};

// Refresh Token

export const refreshToken = async () => {
  const response = await api.post("/auth/refresh");

  return response.data;
};

// Get Current User

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};
