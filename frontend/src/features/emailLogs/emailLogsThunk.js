import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getEmailLogsAPI,
  getEmailLogByIdAPI,
} from "./emailLogsAPI";

// Fetch all email logs
export const fetchEmailLogs = createAsyncThunk(
  "emailLogs/fetchEmailLogs",
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await getEmailLogsAPI(params);

      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch email logs"
      );
    }
  }
);

// Fetch single email log
export const fetchEmailLogById = createAsyncThunk(
  "emailLogs/fetchEmailLogById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getEmailLogByIdAPI(id);

      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch email log"
      );
    }
  }
);