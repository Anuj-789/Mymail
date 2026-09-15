import api from "@/services/api";

/**
 * Send email through the existing Email Engine API.
 *
 * Backend endpoint:
 * POST /api/email/send
 *
 * Backend expects:
 * {
 *   templateId,
 *   to,
 *   data
 * }
 *
 * API key is sent through:
 * x-api-key
 */
export const sendTestEmailAPI = async ({
  templateId,
  to,
  data,
  apiKey,
}) => {
  const response = await api.post(
    "/email/send",
    {
      templateId,
      to,
      data,
    },
    {
      headers: {
        "x-api-key": apiKey,
      },
    },
  );

  return response.data;
};