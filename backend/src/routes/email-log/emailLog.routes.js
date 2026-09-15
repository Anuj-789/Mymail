const express = require("express");

const router = express.Router();

const {
  getEmailLogs,

  getEmailLogById,
} = require("../../controllers/email-log/emailLog.controller");

const authMiddleware = require("../../middlewares/auth/auth.middleware");

// Get All Email Logs

router.get(
  "/",

  authMiddleware,

  getEmailLogs,
);

// Get Single Email Log

router.get(
  "/:id",

  authMiddleware,

  getEmailLogById,
);

module.exports = router;
