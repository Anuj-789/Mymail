const express = require("express");

const router = express.Router();

const authMiddleware = require("../../../middlewares/auth/auth.middleware");

const adminMiddleware = require("../../../middlewares/admin/admin.middleware");

const {
  getAdminProfile,

  updateAdminProfile,

  changeAdminPassword,
} = require("../../../controllers/dashboard/admin-dashboard/adminProfile.controller");

// Get Admin Profile

router.get(
  "/profile",

  authMiddleware,

  adminMiddleware,

  getAdminProfile,
);

// Update Admin Profile

router.put(
  "/profile",

  authMiddleware,

  adminMiddleware,

  updateAdminProfile,
);

// Change Password

router.put(
  "/profile/change-password",

  authMiddleware,

  adminMiddleware,

  changeAdminPassword,
);

module.exports = router;
