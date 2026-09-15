import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getDashboardAPI
} from "./dashboardAPI";


// ==================================================
// FETCH DASHBOARD
// ==================================================

export const fetchDashboard = createAsyncThunk(

  "dashboard/fetchDashboard",

  async (_, { rejectWithValue }) => {

    try {

      const response =
        await getDashboardAPI();


      // Backend response:
      //
      // {
      //   success: true,
      //   dashboard: {
      //      totalProjects,
      //      totalTemplates,
      //      totalEmails,
      //      sentEmails,
      //      failedEmails,
      //      successRate,
      //      recentProjects,
      //      recentEmails
      //   }
      // }


      return response.dashboard;

    }

    catch (error) {

      return rejectWithValue(

        error.response?.data?.message
        ||
        "Dashboard fetch failed"

      );

    }

  }

);