export const selectSystemTemplates = (state) => state.template.systemTemplates;

export const selectCurrentSystemTemplate = (state) =>
  state.template.currentSystemTemplate;

export const selectTemplates = (state) => state.template.templates;

export const selectCurrentTemplate = (state) => state.template.currentTemplate;

export const selectTemplateVariables = (state) => state.template.variables;

export const selectTemplatePreview = (state) => state.template.preview;

export const selectTemplateLoading = (state) => state.template.loading;

export const selectTemplateError = (state) => state.template.error;
