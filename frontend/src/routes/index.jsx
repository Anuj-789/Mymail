import { useRoutes } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import DashboardRoutes from "./DashboardRoutes";
import AdminRoutes from "./AdminRoutes";

const AppRoutes = () => {
  return useRoutes([
    ...PublicRoutes,
    ...AuthRoutes,
    ...DashboardRoutes,
    ...AdminRoutes,
  ]);
};

export default AppRoutes;