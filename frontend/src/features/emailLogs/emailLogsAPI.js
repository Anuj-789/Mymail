import api from "../../services/api";

// Get all email logs
export const getEmailLogsAPI = async ({
  page = 1,
  limit = 10,
  status = "",
  projectId = "",
} = {}) => {
  const params = {
    page,
    limit,
  };

  if (status) {
    params.status = status;
  }

  if (projectId) {
    params.projectId = projectId;
  }

  const response = await api.get("/email-logs", {
    params,
  });

  return response.data;
};

// Get single email log
export const getEmailLogByIdAPI = async (id) => {
  const response = await api.get(`/email-logs/${id}`);

  return response.data;
};
