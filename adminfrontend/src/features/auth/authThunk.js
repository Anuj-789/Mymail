import {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  logoutUser,
  getCurrentUser,
} from "../../services/auth.api";

import {
  authStart,
  loginSuccess,
  logoutSuccess,
  authError,
  setInitialized,
} from "./authSlice";

import {
  setAccessToken,
  removeAccessToken,
} from "../../utils/storage";

// Register

export const registerThunk = (data) => async (dispatch) => {
  try {
    dispatch(authStart());

    const response = await registerUser(data);

    dispatch(setInitialized());

    return {
      success: true,

      data: response,
    };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Registration failed";

    dispatch(authError(message));

    return {
      success: false,

      message,
    };
  }
};

// Login

export const loginThunk = (data) => async (dispatch) => {
  try {
    dispatch(authStart());

    const response = await loginUser(data);

    const { accessToken, user } = response;

    setAccessToken(accessToken);

    dispatch(
      loginSuccess({
        accessToken,

        user,
      }),
    );

    return {
      success: true,

      user,

      accessToken,
    };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Login failed";

    dispatch(authError(message));

    return {
      success: false,

      message,
    };
  }
};

// Verify Email

export const verifyEmailThunk = (token) => async (dispatch) => {
  try {
    dispatch(authStart());

    const response = await verifyEmail(token);

    dispatch(setInitialized());

    return {
      success: true,

      data: response,
    };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Email verification failed";

    dispatch(authError(message));

    return {
      success: false,

      message,
    };
  }
};

// Forgot Password

export const forgotPasswordThunk =
  (data) => async (dispatch) => {
    try {
      dispatch(authStart());

      const response = await forgotPassword(data);

      dispatch(setInitialized());

      return {
        success: true,

        data: response,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to send reset email";

      dispatch(authError(message));

      return {
        success: false,

        message,
      };
    }
  };

// Reset Password

export const resetPasswordThunk =
  (token, data) => async (dispatch) => {
    try {
      dispatch(authStart());

      const response = await resetPassword(token, data);

      dispatch(setInitialized());

      return {
        success: true,

        data: response,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Password reset failed";

      dispatch(authError(message));

      return {
        success: false,

        message,
      };
    }
  };

// Logout

export const logoutThunk = () => async (dispatch) => {
  try {
    await logoutUser();
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    removeAccessToken();

    dispatch(logoutSuccess());
  }
};

// Restore Session

export const restoreSessionThunk =
  () => async (dispatch) => {
    try {
      const response = await getCurrentUser();

      if (response?.user) {
        dispatch(
          loginSuccess({
            user: response.user,

            accessToken: null,
          }),
        );
      } else {
        dispatch(setInitialized());
      }
    } catch (error) {
      removeAccessToken();

      dispatch(setInitialized());
    }
  };
