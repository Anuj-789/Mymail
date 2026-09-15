import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="
      flex
      h-screen
      overflow-hidden
      bg-stone-950
      text-white
      "
    >
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div
        className="
        flex
        flex-1
        flex-col
        overflow-hidden
        "
      >
        <Header setSidebarOpen={setSidebarOpen} />

        <main
          className="
          flex-1
          overflow-y-auto
          p-4
          sm:p-6
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
