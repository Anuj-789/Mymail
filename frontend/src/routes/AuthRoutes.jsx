import AuthLayout from "@/layouts/AuthLayout";

import Login from "@/modules/auth/pages/Login";
import Register from "@/modules/auth/pages/Register";
import VerifyEmail from "@/modules/auth/pages/VerifyEmail";
import ForgotPassword from "@/modules/auth/pages/ForgotPassword";
import ResetPassword from "@/modules/auth/pages/ResetPassword";

const AuthRoutes = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "verify-email/:token",
        element: <VerifyEmail />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
    ],
  },
];

export default AuthRoutes;