import api from "./api";

export const sendTestEmailAPI = async (payload) => {
  const response = await api.post("/email/send-test", payload);

  return response.data;
};