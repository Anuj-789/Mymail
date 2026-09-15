import { createSlice } from "@reduxjs/toolkit";
import { sendTestEmail } from "./emailThunk";

const initialState = {
  sending: false,
  success: false,
  error: null,
  message: null,
  messageId: null,
};

const emailSlice = createSlice({
  name: "email",

  initialState,

  reducers: {
    resetEmailState: (state) => {
      state.sending = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.messageId = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendTestEmail.pending, (state) => {
        state.sending = true;
        state.success = false;
        state.error = null;
        state.message = null;
        state.messageId = null;
      })

      .addCase(sendTestEmail.fulfilled, (state, action) => {
        state.sending = false;
        state.success = true;
        state.error = null;

        state.message =
          action.payload?.message || "Test email sent successfully";

        state.messageId =
          action.payload?.messageId ||
          action.payload?.data?.messageId ||
          action.payload?.data?.id ||
          null;
      })

      .addCase(sendTestEmail.rejected, (state, action) => {
        state.sending = false;
        state.success = false;
        state.error =
          action.payload || "Email could not be sent";
      });
  },
});

export const { resetEmailState } = emailSlice.actions;

export default emailSlice.reducer;