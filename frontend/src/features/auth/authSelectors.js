export const selectUser = (state) => state.auth.user;

export const selectToken = (state) => state.auth.token;

export const selectLoading = (state) => state.auth.loading;

export const selectAuth = (state) => state.auth.isAuthenticated;
