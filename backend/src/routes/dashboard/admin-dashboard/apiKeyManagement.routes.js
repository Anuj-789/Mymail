const express = require("express");

const router = express.Router();

const authMiddleware = require("../../../middlewares/auth/auth.middleware");

const adminMiddleware = require("../../../middlewares/admin/admin.middleware");

const {
  getApiKeyOverview,

  getAllApiKeys,
} = require("../../../controllers/dashboard/admin-dashboard/apiKeyManagement.controller");

// Overview

router.get(
  "/overview",

  authMiddleware,

  adminMiddleware,

  getApiKeyOverview,
);

// All API Keys

router.get(
  "/",

  authMiddleware,

  adminMiddleware,

  getAllApiKeys,
);

module.exports = router;
