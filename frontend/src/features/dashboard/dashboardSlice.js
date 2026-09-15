import { createSlice } from "@reduxjs/toolkit";

import {
  fetchDashboard
} from "./dashboardThunk";


// ==================================================
// INITIAL STATE
// ==================================================

const initialState = {

  data: null,

  loading: false,

  error: null,

};


// ==================================================
// DASHBOARD SLICE
// ==================================================

const dashboardSlice = createSlice({

  name: "dashboard",

  initialState,


  reducers: {},


  extraReducers: (builder) => {

    builder


      // ==================================================
      // LOADING
      // ==================================================

      .addCase(

        fetchDashboard.pending,

        (state) => {

          state.loading = true;

          state.error = null;

        }

      )


      // ==================================================
      // SUCCESS
      // ==================================================

      .addCase(

        fetchDashboard.fulfilled,

        (state, action) => {

          state.loading = false;

          state.data = action.payload;

          state.error = null;

        }

      )


      // ==================================================
      // ERROR
      // ==================================================

      .addCase(

        fetchDashboard.rejected,

        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Dashboard fetch failed";

        }

      );

  },

});


export default dashboardSlice.reducer;