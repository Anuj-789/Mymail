const express = require("express");

const router = express.Router();

const {
  createProject,
  getProjects,
  getAvailableProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../../controllers/project/project.controller");

const authMiddleware = require("../../middlewares/auth/auth.middleware");


// Create Project
router.post(
  "/",
  authMiddleware,
  createProject
);


// Get All Projects
router.get(
  "/",
  authMiddleware,
  getProjects
);


// Get Projects Without Template
router.get(
  "/available",
  authMiddleware,
  getAvailableProjects
);


// Get Single Project
router.get(
  "/:id",
  authMiddleware,
  getProjectById
);


// Update Project
router.put(
  "/:id",
  authMiddleware,
  updateProject
);


// Delete Project
router.delete(
  "/:id",
  authMiddleware,
  deleteProject
);


module.exports = router;