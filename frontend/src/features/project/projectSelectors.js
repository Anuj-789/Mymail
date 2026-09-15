// Get all projects

export const selectProjects = (state) => {
  return state.projects.projects;
};



// Get current single project

export const selectProject = (state) => {
  return state.projects.currentProject;
};



// Loading state

export const selectProjectLoading = (state) => {
  return state.projects.loading;
};



// Error state

export const selectProjectError = (state) => {
  return state.projects.error;
};



// Optional: direct current project selector

export const selectCurrentProject = (state) => {
  return state.projects.currentProject;
};