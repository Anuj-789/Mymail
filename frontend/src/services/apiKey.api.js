import api from "./api";


// Get API Keys of Project
export const getApiKeysAPI = async (projectId) => {

  const response = await api.get(
    `/projects/${projectId}/api-key`
  );

  return response.data;

};




// Generate Production API Key
export const generateApiKeyAPI = async (projectId) => {

  const response = await api.post(
    `/projects/${projectId}/api-key`
  );

  return response.data;

};




// Regenerate API Key
export const regenerateApiKeyAPI = async (projectId) => {

  const response = await api.put(
    `/projects/${projectId}/api-key/regenerate`
  );

  return response.data;

};




// Change API Key Status
export const changeApiKeyStatusAPI = async (
  projectId,
  status
) => {

  const response = await api.put(
    `/projects/${projectId}/api-key/status`,
    {
      status
    }
  );


  return response.data;

};