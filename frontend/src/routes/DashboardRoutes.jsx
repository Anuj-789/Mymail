import DashboardLayout from "@/layouts/DashboardLayout";

import Dashboard from "@/modules/dashboard/pages/Dashboard";

import ProjectRoutes from "@/modules/projects/project.routes";

import ApiKeyRoutes from "@/modules/apiKeys/apiKey.routes";

import templateRoutes from "@/modules/templates/template.routes";

import settingsRoutes from "@/modules/settings/settings.routes";

import documentationRoutes from "@/modules/documentation/documentation.routes";



import emailRoutes from "@/modules/email/email.routes";

import emailLogRoutes from "@/modules/emailLogs/emailLogs.routes";

const DashboardRoutes = [
  {
    path: "/dashboard",

    element: <DashboardLayout />,

    children: [
      {
        index: true,

        element: <Dashboard />,
      },

      ...ProjectRoutes,

      ...ApiKeyRoutes,

      ...templateRoutes,

      ...settingsRoutes,

      ...documentationRoutes,

      ...emailRoutes,

      ...emailLogRoutes,
    ],
  },
];

export default DashboardRoutes;