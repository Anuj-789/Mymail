import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,

  accessToken: null,

  isAuthenticated: false,

  loading: false,

  error: null,

  initialized: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;

      state.user = action.payload.user;

      state.accessToken = action.payload.accessToken;

      state.isAuthenticated = true;

      state.error = null;

      state.initialized = true;
    },

    setCredentials: (state, action) => {
      state.user = action.payload.user;

      state.accessToken = action.payload.accessToken || null;

      state.isAuthenticated = Boolean(action.payload.user);

      state.initialized = true;

      state.loading = false;

      state.error = null;
    },

    updateUser: (state, action) => {
      state.user = {
        ...state.user,

        ...action.payload,
      };
    },

    tokenUpdated: (state, action) => {
      state.accessToken = action.payload;
    },

    logoutSuccess: (state) => {
      state.user = null;

      state.accessToken = null;

      state.isAuthenticated = false;

      state.loading = false;

      state.error = null;

      state.initialized = true;
    },

    authError: (state, action) => {
      state.loading = false;

      state.error = action.payload;

      state.initialized = true;
    },

    clearAuthError: (state) => {
      state.error = null;
    },

    setInitialized: (state) => {
      state.initialized = true;

      state.loading = false;
    },
  },
});

export const {
  authStart,
  loginSuccess,
  setCredentials,
  updateUser,
  tokenUpdated,
  logoutSuccess,
  authError,
  clearAuthError,
  setInitialized,
} = authSlice.actions;

export default authSlice.reducer;
