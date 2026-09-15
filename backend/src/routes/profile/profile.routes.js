const express = require("express");

const router = express.Router();

const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../../controllers/profile/profile.controller");

const authMiddleware = require("../../middlewares/auth/auth.middleware");

// Get Profile

router.get("/", authMiddleware, getProfile);

// Update Profile

router.put("/", authMiddleware, updateProfile);

// Change Password

router.put("/change-password", authMiddleware, changePassword);

module.exports = router;
