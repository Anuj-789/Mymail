const express = require("express");

const router = express.Router();


const authMiddleware = require("../../middlewares/auth/auth.middleware");


const {
    generateApiKey, getApiKeys,regenerateApiKey,changeApiKeyStatus
} = require("../../controllers/apiKey/apiKey.controller");



// Generate API Key

router.post(
    "/:projectId/api-key",
    authMiddleware,
    generateApiKey
);

// Get API Keys

router.get(
    "/:projectId/api-key",
    authMiddleware,
    getApiKeys
);

router.put(
    "/:projectId/api-key/regenerate",
    authMiddleware,
    regenerateApiKey
);

router.put(
    "/:projectId/api-key/status",
    authMiddleware,
    changeApiKeyStatus
);


module.exports = router;