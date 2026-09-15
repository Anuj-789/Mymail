import PublicLayout from "@/layouts/PublicLayout";

import Home from "@/modules/landing/pages/Home";
import Documentation from "@/modules/landing/components/Documentation";

const PublicRoutes = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "documentation",
        element: <Documentation />,
      },
    ],
  },
];

export default PublicRoutes;
