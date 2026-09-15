const express = require("express");

const router = express.Router();

const authMiddleware = require("../../../middlewares/auth/auth.middleware");

const adminMiddleware = require("../../../middlewares/admin/admin.middleware");

const {
  getActivities,

  getActivityById,
} = require("../../../controllers/dashboard/admin-dashboard/activity.controller");

router.get(
  "/",

  authMiddleware,

  adminMiddleware,

  getActivities,
);

router.get(
  "/:id",

  authMiddleware,

  adminMiddleware,

  getActivityById,
);

module.exports = router;
