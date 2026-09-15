import Templates from "./pages/Templates";

import CreateTemplate from "./pages/CreateTemplate";

import EditTemplate from "./pages/EditTemplate";

import TemplatePreview from "./pages/TemplatePreview";

const templateRoutes = [
  {
    path: "templates",

    children: [
      {
        index: true,

        element: <Templates />,
      },

      {
        path: ":projectId/create",

        element: <CreateTemplate />,
      },

      {
        path: ":projectId/edit/:id",

        element: <EditTemplate />,
      },

      {
        path: ":projectId/preview/:id",

        element: <TemplatePreview />,
      },
    ],
  },
];

export default templateRoutes;
