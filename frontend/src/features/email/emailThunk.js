import { createAsyncThunk } from "@reduxjs/toolkit";

import { sendTestEmailAPI } from "./emailAPI";

export const sendTestEmail = createAsyncThunk(
  "email/sendTestEmail",

  async (payload, { rejectWithValue }) => {
    try {
      const response = await sendTestEmailAPI(payload);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Email could not be sent",
      );
    }
  },
);