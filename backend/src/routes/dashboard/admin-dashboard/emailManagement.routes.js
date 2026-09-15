const express = require("express");

const router = express.Router();

const authMiddleware = require("../../../middlewares/auth/auth.middleware");

const adminMiddleware = require("../../../middlewares/admin/admin.middleware");

const {
  getAllEmails,

  getEmailDetail,

  getEmailStats,
} = require("../../../controllers/dashboard/admin-dashboard/emailManagement.controller");

// All Emails

router.get(
  "/emails",

  authMiddleware,

  adminMiddleware,

  getAllEmails,
);

// All Email Logs

router.get("/emails/logs", authMiddleware, adminMiddleware, getAllEmails);

// Email Detail

router.get(
  "/emails/:id",

  authMiddleware,

  adminMiddleware,

  getEmailDetail,
);

// Statistics

router.get(
  "/email-stats",

  authMiddleware,

  adminMiddleware,

  getEmailStats,
);

module.exports = router;
