const express = require("express");

const router = express.Router();

const authMiddleware = require("../../../middlewares/auth/auth.middleware");

const adminMiddleware = require("../../../middlewares/admin/admin.middleware");

const {
  getAllProjects,

  getProjectDetail,

  updateProjectStatus,
} = require("../../../controllers/dashboard/admin-dashboard/projectManagement.controller");

// All Projects

router.get(
  "/projects",

  authMiddleware,

  adminMiddleware,

  getAllProjects,
);

// Single Project

router.get(
  "/projects/:id",

  authMiddleware,

  adminMiddleware,

  getProjectDetail,
);

// Status Update

router.put(
  "/projects/:id/status",

  authMiddleware,

  adminMiddleware,

  updateProjectStatus,
);

module.exports = router;
