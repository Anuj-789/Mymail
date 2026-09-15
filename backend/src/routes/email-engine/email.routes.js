
const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middlewares/auth/auth.middleware");

const apiKeyMiddleware = require("../../middlewares/apiKey/apiKey.middleware");

const emailAuthMiddleware = require("../../middlewares/email-engine/emailAuth.middleware");

const {
    sendEmailController,
    sendDashboardEmailController
} = require("../../controllers/email-engine/emailSend.controller");

const {
    getEmailLogs,
    getSingleEmailLog
} = require("../../controllers/email-engine/emailLog.controller");

const {
    saveEmailConfig,
    getEmailConfig
} = require("../../controllers/email-engine/emailConfig.controller");


// ===============================
// Developer Email Send API
// ===============================

router.post(
    "/send",
    apiKeyMiddleware,
    emailAuthMiddleware,
    sendEmailController
);


// ===============================
// Dashboard Email Send
// ===============================
// Dashboard JWT se authenticated hoga.
// Is route me API key frontend se nahi bhejni.
// Backend project ki production API key
// aur uska status khud check karega.
// ===============================

router.post(
    "/dashboard-send",
    authMiddleware,
    sendDashboardEmailController
);


// ===============================
// Email Logs (Dashboard)
// ===============================

router.get(
    "/logs",
    authMiddleware,
    getEmailLogs
);


router.get(
    "/logs/:id",
    authMiddleware,
    getSingleEmailLog
);


// ===============================
// Email Configuration
// ===============================

router.post(
    "/config",
    authMiddleware,
    saveEmailConfig
);


router.get(
    "/config/:projectId",
    authMiddleware,
    getEmailConfig
);


module.exports = router;

