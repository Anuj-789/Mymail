import { useDispatch, useSelector } from "react-redux";

import {
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectIsAdmin,
} from "../features/auth/authSelectors";

import {
  loginThunk,
  logoutThunk,
  registerThunk,
} from "../features/auth/authThunk";

const useAuth = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const isAuthenticated = useSelector(
    selectIsAuthenticated,
  );

  const loading = useSelector(selectAuthLoading);

  const isAdmin = useSelector(selectIsAdmin);

  const login = (data) => {
    return dispatch(loginThunk(data));
  };

  const register = (data) => {
    return dispatch(registerThunk(data));
  };

  const logout = () => {
    return dispatch(logoutThunk());
  };

  return {
    user,

    isAuthenticated,

    isAdmin,

    loading,

    login,

    register,

    logout,
  };
};

export default useAuth;
