const express = require("express");

const router = express.Router();

// ============================================================
// CONTROLLER
// ============================================================

const {
  getSettings,
  updateSettings,
  deleteProject,
} = require(
  "../../controllers/settings2/settings.controller",
);

// ============================================================
// AUTH MIDDLEWARE
// ============================================================

const authMiddleware = require(
  "../../middlewares/auth/auth.middleware",
);

// ============================================================
// GET SETTINGS
// ============================================================

router.get(
  "/",
  authMiddleware,
  getSettings,
);

// ============================================================
// UPDATE SETTINGS
// ============================================================

router.put(
  "/",
  authMiddleware,
  updateSettings,
);

// ============================================================
// DELETE PROJECT
// ============================================================

router.delete(
  "/projects/:projectId",
  authMiddleware,
  deleteProject,
);

// ============================================================
// EXPORT
// ============================================================

module.exports = router;