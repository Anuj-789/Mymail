import { createSlice } from "@reduxjs/toolkit";

import {
  fetchApiKeys,
  generateApiKey,
  regenerateApiKey,
  updateApiKeyStatus,
} from "./apiKeyThunk";

const initialState = {
  apiKeys: [],

  generatedKey: null,

  loading: false,

  error: null,
};

const apiKeySlice = createSlice({
  name: "apiKey",

  initialState,

  reducers: {
    clearGeneratedKey: (state) => {
      state.generatedKey = null;
    },

    clearApiKeyError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH API KEYS

      .addCase(fetchApiKeys.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchApiKeys.fulfilled, (state, action) => {
        state.loading = false;

        const incomingKeys = action.payload || [];

        incomingKeys.forEach((newKey) => {
          const index = state.apiKeys.findIndex(
            (item) => item._id === newKey._id,
          );

          if (index !== -1) {
            // update existing key

            state.apiKeys[index] = newKey;
          } else {
            // add new key

            state.apiKeys.push(newKey);
          }
        });
      })

      .addCase(fetchApiKeys.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // GENERATE

      .addCase(generateApiKey.fulfilled, (state, action) => {
        state.generatedKey = action.payload;
      })

      // REGENERATE

      .addCase(regenerateApiKey.fulfilled, (state, action) => {
        state.generatedKey = action.payload;
      })

      // STATUS UPDATE

      .addCase(updateApiKeyStatus.fulfilled, (state, action) => {
        const updated = action.payload;

        const index = state.apiKeys.findIndex(
          (item) => item._id === updated._id,
        );

        if (index !== -1) {
          state.apiKeys[index] = updated;
        }
      });
  },
});

export const {
  clearGeneratedKey,

  clearApiKeyError,
} = apiKeySlice.actions;

export default apiKeySlice.reducer;
