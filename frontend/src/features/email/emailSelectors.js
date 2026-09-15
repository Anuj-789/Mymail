export const selectEmailSending = (state) =>
  state.email?.sending || false;

export const selectEmailSuccess = (state) =>
  state.email?.success || false;

export const selectEmailError = (state) =>
  state.email?.error || null;

export const selectEmailMessage = (state) =>
  state.email?.message || null;

export const selectEmailMessageId = (state) =>
  state.email?.messageId || null;