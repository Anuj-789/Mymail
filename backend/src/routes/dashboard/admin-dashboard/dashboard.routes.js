const express = require("express");

const router = express.Router();

// Admin Routes

router.use("/admin", require("./adminOverview.routes"));

router.use("/admin", require("./adminProfile.routes"));

router.use("/admin", require("./userManagement.routes"));

router.use("/admin", require("./projectManagement.routes"));

router.use("/admin", require("./emailManagement.routes"));

router.use("/admin", require("./templateManagement.routes"));

// Analytics

router.use("/analytics", require("./analytics.routes"));

// Activity

router.use("/activity", require("./activity.routes"));

// API Key Monitoring

router.use("/api-keys", require("./apiKeyManagement.routes"));

module.exports = router;
