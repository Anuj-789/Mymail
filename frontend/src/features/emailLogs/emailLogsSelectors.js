export const selectEmailLogs = (state) =>
  state.emailLogs?.logs || [];

export const selectCurrentEmailLog = (state) =>
  state.emailLogs?.currentLog || null;

export const selectEmailLogsTotal = (state) =>
  state.emailLogs?.total || 0;

export const selectEmailLogsPage = (state) =>
  state.emailLogs?.page || 1;

export const selectEmailLogsLimit = (state) =>
  state.emailLogs?.limit || 10;

export const selectEmailLogsLoading = (state) =>
  state.emailLogs?.loading || false;

export const selectEmailLogDetailsLoading = (state) =>
  state.emailLogs?.detailsLoading || false;

export const selectEmailLogsError = (state) =>
  state.emailLogs?.error || null;

export const selectEmailLogDetailsError = (state) =>
  state.emailLogs?.detailsError || null;