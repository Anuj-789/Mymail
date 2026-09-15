const express = require("express");

const router = express.Router();

const authMiddleware = require("../../../middlewares/auth/auth.middleware");

const adminMiddleware = require("../../../middlewares/admin/admin.middleware");

const {
  getAdminOverview,
} = require("../../../controllers/dashboard/admin-dashboard/adminOverview.controller");

router.get(
  "/overview",

  authMiddleware,

  adminMiddleware,

  getAdminOverview,
);

module.exports = router;
