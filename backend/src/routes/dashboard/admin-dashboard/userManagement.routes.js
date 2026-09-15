const express = require("express");

const router = express.Router();

const authMiddleware = require("../../../middlewares/auth/auth.middleware");

const adminMiddleware = require("../../../middlewares/admin/admin.middleware");

const {
  getAllUsers,

  getUserProfile,

  updateUserStatus,
} = require("../../../controllers/dashboard/admin-dashboard/userManagement.controller");

// Get All Users

router.get(
  "/users",

  authMiddleware,

  adminMiddleware,

  getAllUsers,
);

// Get User Full Profile

router.get(
  "/users/:id",

  authMiddleware,

  adminMiddleware,

  getUserProfile,
);

// Block / Unblock

router.put(
  "/users/:id/status",

  authMiddleware,

  adminMiddleware,

  updateUserStatus,
);

module.exports = router;
