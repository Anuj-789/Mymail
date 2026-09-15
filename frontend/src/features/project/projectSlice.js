import { createSlice } from "@reduxjs/toolkit";

import {
  fetchProjects,
  fetchProject,
  createProject,
  updateProject,
  deleteProject,
} from "./projectThunk";

const initialState = {
  projects: [],

  currentProject: null,

  loading: false,

  error: null,
};

const projectSlice = createSlice({
  name: "projects",

  initialState,

  reducers: {
    clearProjectError: (state) => {
      state.error = null;
    },

    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH ALL

      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;

        state.projects = action.payload || [];
      })

      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // FETCH SINGLE

      .addCase(fetchProject.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProject.fulfilled, (state, action) => {
        state.loading = false;

        state.currentProject = action.payload;
      })

      .addCase(fetchProject.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // CREATE

      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.unshift(action.payload);
      })

      // UPDATE

      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (item) => item._id === action.payload._id,
        );

        if (index !== -1) {
          state.projects[index] = action.payload;
        }

        if (state.currentProject?._id === action.payload._id) {
          state.currentProject = action.payload;
        }
      })

      // DELETE

      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (item) => item._id !== action.payload,
        );

        if (state.currentProject?._id === action.payload) {
          state.currentProject = null;
        }
      });
  },
});

export const {
  clearProjectError,

  clearCurrentProject,
} = projectSlice.actions;

export default projectSlice.reducer;
