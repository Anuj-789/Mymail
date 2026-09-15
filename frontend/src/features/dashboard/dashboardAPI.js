import api from "@/services/api";


// ==================================================
// GET DASHBOARD OVERVIEW
// ==================================================

export const getDashboardAPI = async () => {

  const response = await api.get(
    "/user-dashboard/overview"
  );

  return response.data;

};