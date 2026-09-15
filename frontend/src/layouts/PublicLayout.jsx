import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <Outlet />
    </div>
  );
};

export default PublicLayout;