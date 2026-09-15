import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getApiKeysAPI,
  generateApiKeyAPI,
  regenerateApiKeyAPI,
  updateApiKeyStatusAPI,
} from "./apiKeyAPI";

// Fetch API Keys

export const fetchApiKeys = createAsyncThunk(
  "apiKey/fetchApiKeys",

  async (projectId, { rejectWithValue }) => {
    try {
      const data = await getApiKeysAPI(projectId);

      return data.apiKeys;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch api keys",
      );
    }
  },
);

// Generate API Key

export const generateApiKey = createAsyncThunk(
  "apiKey/generateApiKey",

  async (projectId, { rejectWithValue }) => {
    try {
      const data = await generateApiKeyAPI(projectId);

      return data.apiKey;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate api key",
      );
    }
  },
);

// Regenerate API Key

export const regenerateApiKey = createAsyncThunk(
  "apiKey/regenerateApiKey",

  async (projectId, { rejectWithValue }) => {
    try {
      const data = await regenerateApiKeyAPI(projectId);

      return data.apiKey;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to regenerate api key",
      );
    }
  },
);

// Update Status

export const updateApiKeyStatus = createAsyncThunk(
  "apiKey/updateStatus",

  async ({ projectId, status }, { rejectWithValue }) => {
    try {
      const data = await updateApiKeyStatusAPI(projectId, status);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update status",
      );
    }
  },
);
