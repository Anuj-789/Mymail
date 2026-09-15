import { createSlice } from "@reduxjs/toolkit";

import {
  fetchEmailLogs,
  fetchEmailLogById,
} from "./emailLogsThunk";

const initialState = {
  logs: [],

  currentLog: null,

  total: 0,

  page: 1,

  limit: 10,

  loading: false,

  detailsLoading: false,

  error: null,

  detailsError: null,
};

const emailLogsSlice = createSlice({
  name: "emailLogs",

  initialState,

  reducers: {
    clearCurrentLog: (state) => {
      state.currentLog = null;
      state.detailsError = null;
    },

    clearEmailLogsError: (state) => {
      state.error = null;
    },

    clearEmailLogDetailsError: (state) => {
      state.detailsError = null;
    },
  },

  extraReducers: (builder) => {
    // =========================
    // FETCH ALL LOGS
    // =========================

    builder
      .addCase(fetchEmailLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchEmailLogs.fulfilled, (state, action) => {
        state.loading = false;

        state.logs = action.payload?.logs || [];

        state.total = action.payload?.total || 0;

        state.page = action.payload?.page || 1;

        state.limit = action.payload?.limit || 10;
      })

      .addCase(fetchEmailLogs.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Failed to fetch email logs";
      });

    // =========================
    // FETCH SINGLE LOG
    // =========================

    builder
      .addCase(fetchEmailLogById.pending, (state) => {
        state.detailsLoading = true;

        state.detailsError = null;
      })

      .addCase(fetchEmailLogById.fulfilled, (state, action) => {
        state.detailsLoading = false;

        state.currentLog = action.payload?.log || null;
      })

      .addCase(fetchEmailLogById.rejected, (state, action) => {
        state.detailsLoading = false;

        state.detailsError =
          action.payload || "Failed to fetch email log";
      });
  },
});

export const {
  clearCurrentLog,
  clearEmailLogsError,
  clearEmailLogDetailsError,
} = emailLogsSlice.actions;

export default emailLogsSlice.reducer;