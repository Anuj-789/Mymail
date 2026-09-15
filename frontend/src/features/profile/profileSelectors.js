export const selectProfile = (state) => state.profile.user;

export const selectProfileLoading = (state) => state.profile.loading;

export const selectPasswordLoading = (state) => state.profile.passwordLoading;

export const selectProfileError = (state) => state.profile.error;

export const selectProfileMessage = (state) => state.profile.successMessage;
