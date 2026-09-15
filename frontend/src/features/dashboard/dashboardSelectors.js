import { createSelector } from "@reduxjs/toolkit";


// ==================================================
// DASHBOARD DATA
// ==================================================

export const selectDashboard = createSelector(

  [
    (state) => state.dashboard
  ],

  (dashboard) => dashboard.data

);


// ==================================================
// DASHBOARD LOADING
// ==================================================

export const selectDashboardLoading = createSelector(

  [
    (state) => state.dashboard
  ],

  (dashboard) => dashboard.loading

);


// ==================================================
// DASHBOARD ERROR
// ==================================================

export const selectDashboardError = createSelector(

  [
    (state) => state.dashboard
  ],

  (dashboard) => dashboard.error

);