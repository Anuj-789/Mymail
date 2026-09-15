import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getProjectsAPI,
  getProjectAPI,
  createProjectAPI,
  updateProjectAPI,
  deleteProjectAPI,
} from "./projectAPI";

// Get All Projects

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",

  async (_, { rejectWithValue }) => {
    try {
      const response = await getProjectsAPI();

      return response.projects;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch projects",
      );
    }
  },
);

// Get Single Project

export const fetchProject = createAsyncThunk(
  "projects/fetchProject",

  async (id, { rejectWithValue }) => {
    try {
      const response = await getProjectAPI(id);

      return response.project;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Project not found",
      );
    }
  },
);

// Create Project

export const createProject = createAsyncThunk(
  "projects/createProject",

  async (data, { rejectWithValue }) => {
    try {
      const response = await createProjectAPI(data);

      return response.project;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Create failed");
    }
  },
);

// Update Project

export const updateProject = createAsyncThunk(
  "projects/updateProject",

  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateProjectAPI(id, data);

      return response.project;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  },
);

// Delete Project

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",

  async (id, { rejectWithValue }) => {
    try {
      await deleteProjectAPI(id);

      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  },
);
