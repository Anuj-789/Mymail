import { createSlice } from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser,
  logoutUser,
} from "./authThunk";


const initialState = {
  user: null,

  token:
    localStorage.getItem("accessToken") || null,

  loading: false,

  error: null,

  isAuthenticated:
    !!localStorage.getItem("accessToken"),
};


const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    // =====================================================
    // CLEAR ERROR
    // =====================================================

    clearError: (state) => {
      state.error = null;
    },


    // =====================================================
    // UPDATE TOKEN
    // =====================================================

    setToken: (state, action) => {
      state.token = action.payload;

      state.isAuthenticated = !!action.payload;
    },


    // =====================================================
    // CLEAR AUTH
    // =====================================================

    clearAuth: (state) => {
      state.user = null;

      state.token = null;

      state.isAuthenticated = false;

      state.error = null;

      localStorage.removeItem("accessToken");
    },
  },


  extraReducers: (builder) => {

    // =====================================================
    // LOGIN
    // =====================================================

    builder.addCase(
      loginUser.pending,

      (state) => {
        state.loading = true;

        state.error = null;
      },
    );


    builder.addCase(
      loginUser.fulfilled,

      (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.token =
          action.payload.accessToken;

        state.isAuthenticated = true;

        localStorage.setItem(
          "accessToken",
          action.payload.accessToken,
        );
      },
    );


    builder.addCase(
      loginUser.rejected,

      (state, action) => {
        state.loading = false;

        state.error = action.payload;
      },
    );


    // =====================================================
    // REGISTER
    // =====================================================

    builder.addCase(
      registerUser.pending,

      (state) => {
        state.loading = true;

        state.error = null;
      },
    );


    builder.addCase(
      registerUser.fulfilled,

      (state) => {
        state.loading = false;
      },
    );


    builder.addCase(
      registerUser.rejected,

      (state, action) => {
        state.loading = false;

        state.error = action.payload;
      },
    );


    // =====================================================
    // LOGOUT
    // =====================================================

    builder.addCase(
      logoutUser.fulfilled,

      (state) => {
        state.user = null;

        state.token = null;

        state.isAuthenticated = false;

        state.error = null;

        localStorage.removeItem(
          "accessToken",
        );
      },
    );


    // =====================================================
    // LOGOUT FAILED
    // =====================================================

    builder.addCase(
      logoutUser.rejected,

      (state) => {
        // Even if backend logout fails,
        // clear frontend authentication.

        state.user = null;

        state.token = null;

        state.isAuthenticated = false;

        localStorage.removeItem(
          "accessToken",
        );
      },
    );
  },
});


export const {
  clearError,
  setToken,
  clearAuth,
} = authSlice.actions;


export default authSlice.reducer;