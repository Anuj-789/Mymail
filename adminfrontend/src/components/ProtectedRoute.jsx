import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  selectIsAuthenticated,
  selectIsAdmin,
} from "../features/auth/authSelectors";

const ProtectedRoute = ({ adminOnly = false }) => {
  const location = useLocation();

  const isAuthenticated = useSelector(
    selectIsAuthenticated,
  );

  const isAdmin = useSelector(selectIsAdmin);

  if (!isAuthenticated) {
    return (
      <Navigate
        to={adminOnly ? "/admin/login" : "/login"}
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
