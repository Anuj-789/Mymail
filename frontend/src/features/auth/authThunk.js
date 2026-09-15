import { createAsyncThunk } from "@reduxjs/toolkit";

import { loginAPI, registerAPI, logoutAPI } from "./authAPI";

export const loginUser = createAsyncThunk(
  "auth/login",

  async (data, { rejectWithValue }) => {
    try {
      const response = await loginAPI(data);

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",

  async (data, { rejectWithValue }) => {
    try {
      const response = await registerAPI(data);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",

  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutAPI();

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);
