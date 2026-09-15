import api from "./api";

// REGISTER

export const register = async (data) => {
  const response = await api.post(
    "/auth/register",

    data,
  );

  return response.data;
};

// LOGIN

export const login = async (data) => {
  const response = await api.post(
    "/auth/login",

    data,
  );

  return response.data;
};

// VERIFY EMAIL

export const verifyEmail = async (token) => {
  const response = await api.get(`/auth/verify-email/${token}`);

  return response.data;
};

// FORGOT PASSWORD

export const forgotPassword = async (email) => {
  const response = await api.post(
    "/auth/forgot-password",

    {
      email,
    },
  );

  return response.data;
};

// RESET PASSWORD

export const resetPassword = async (
  token,

  password,
) => {
  const response = await api.post(
    `/auth/reset-password/${token}`,

    {
      password,
    },
  );

  return response.data;
};

// LOGOUT

export const logout = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};

// REFRESH TOKEN

export const refreshToken = async () => {
  const response = await api.post("/auth/refresh-token");

  return response.data;
};
