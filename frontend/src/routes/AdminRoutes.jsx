import AdminLayout from "@/layouts/AdminLayout";
import AdminRoute from "@/components/protected/AdminRoute";

import AdminDashboard from "@/modules/admin/pages/AdminDashboard";

const AdminRoutes = [
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
    ],
  },
];

export default AdminRoutes;