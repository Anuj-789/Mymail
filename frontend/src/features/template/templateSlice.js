import { createSlice } from "@reduxjs/toolkit";

import {
  fetchSystemTemplates,
  fetchSystemTemplate,
  cloneSystemTemplate,
  fetchProjectTemplates,
  fetchSingleTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  previewTemplate,
  previewEditor,
  fetchTemplateVariables,
  extractEditorVariables,
  validateTemplateVariables,
} from "./templateThunk";

const initialState = {
  systemTemplates: [],

  currentSystemTemplate: null,

  templates: [],

  currentTemplate: null,

  variables: [],

  preview: null,

  loading: false,

  error: null,
};

const templateSlice = createSlice({
  name: "template",

  initialState,

  reducers: {
    clearTemplateError: (state) => {
      state.error = null;
    },

    clearPreview: (state) => {
      state.preview = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // SYSTEM

      .addCase(fetchSystemTemplates.fulfilled, (state, action) => {
        state.systemTemplates = action.payload.templates;
      })

      .addCase(fetchSystemTemplate.fulfilled, (state, action) => {
        state.currentSystemTemplate = action.payload.template;
      })

      // PROJECT

      .addCase(fetchProjectTemplates.fulfilled, (state, action) => {
        state.templates = action.payload.templates;
      })

      .addCase(fetchSingleTemplate.fulfilled, (state, action) => {
        state.currentTemplate = action.payload.template;
      })

      // CREATE

      .addCase(createTemplate.fulfilled, (state, action) => {
        state.templates.push(action.payload.template);
      })

      // UPDATE

      .addCase(updateTemplate.fulfilled, (state, action) => {
        state.currentTemplate = action.payload.template;
      })

      // DELETE

      .addCase(deleteTemplate.fulfilled, (state, action) => {})

      // PREVIEW

      .addCase(previewTemplate.fulfilled, (state, action) => {
        state.preview = action.payload.preview;
      })

      .addCase(previewEditor.fulfilled, (state, action) => {
        state.preview = action.payload.preview;
      })

      // VARIABLES

      .addCase(fetchTemplateVariables.fulfilled, (state, action) => {
        state.variables = action.payload.variables;
      })

      .addCase(extractEditorVariables.fulfilled, (state, action) => {
        state.variables = action.payload.variables;
      })

      // COMMON LOADING

      .addMatcher(
        (action) => action.type.endsWith("/pending"),

        (state) => {
          state.loading = true;
        },
      )

      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),

        (state) => {
          state.loading = false;
        },
      )

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),

        (state, action) => {
          state.loading = false;

          state.error = action.error.message;
        },
      );
  },
});

export const {
  clearTemplateError,

  clearPreview,
} = templateSlice.actions;

export default templateSlice.reducer;
