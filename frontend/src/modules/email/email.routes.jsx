import SendEmail from "./pages/SendEmail";
import EmailPreview from "./pages/EmailPreview";

const EmailRoutes = [
  {
    path: "send-email",
    element: <SendEmail />,
  },
  {
    path: "send-email/preview",
    element: <EmailPreview />,
  },
];

export default EmailRoutes;