// All API Keys

export const selectApiKeys = (state) => state.apiKey.apiKeys;

// Loading State

export const selectApiKeyLoading = (state) => state.apiKey.loading;

// Error State

export const selectApiKeyError = (state) => state.apiKey.error;

// Newly Generated Key

export const selectGeneratedApiKey = (state) => state.apiKey.generatedKey;
