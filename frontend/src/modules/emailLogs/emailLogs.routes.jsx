import EmailLogs from "./pages/EmailLogs";
import EmailLogDetails from "./pages/EmailLogDetails";

const emailLogRoutes = [
  {
    path: "email-logs",
    element: <EmailLogs />,
  },
  {
    path: "email-logs/:id",
    element: <EmailLogDetails />,
  },
];

export default emailLogRoutes;