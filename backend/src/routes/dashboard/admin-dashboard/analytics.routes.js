const express = require("express");

const router = express.Router();

const authMiddleware = require("../../../middlewares/auth/auth.middleware");

const adminMiddleware = require("../../../middlewares/admin/admin.middleware");

const {
  getAnalytics,
} = require("../../../controllers/dashboard/admin-dashboard/analytics.controller");

router.get(
  "/",

  authMiddleware,

  adminMiddleware,

  getAnalytics,
);

module.exports = router;
