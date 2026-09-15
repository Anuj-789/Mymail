const EmailLog = require("../../models/email-engine/EmailLog");

// =====================================================
// Get All Email Logs
// =====================================================

const getEmailLogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, projectId } = req.query;

    // -------------------------------------------------
    // User-specific query
    // -------------------------------------------------

    const query = {
      userId: req.user._id,
    };

    // -------------------------------------------------
    // Status Filter
    // -------------------------------------------------

    if (status) {
      query.status = String(status).toLowerCase().trim();
    }

    // -------------------------------------------------
    // Project Filter
    // -------------------------------------------------

    if (projectId) {
      query.projectId = projectId;
    }

    // -------------------------------------------------
    // Pagination
    // -------------------------------------------------

    const currentPage = Math.max(Number(page) || 1, 1);

    const currentLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

    const skip = (currentPage - 1) * currentLimit;

    // -------------------------------------------------
    // Fetch Logs
    // -------------------------------------------------

    const logs = await EmailLog.find(query)
      .populate("projectId", "projectName")
      .populate("templateId", "templateName")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(currentLimit)
      .lean();

    // -------------------------------------------------
    // Total Count
    // -------------------------------------------------

    const total = await EmailLog.countDocuments(query);

    // -------------------------------------------------
    // Response
    // -------------------------------------------------

    return res.status(200).json({
      success: true,

      total,

      page: currentPage,

      limit: currentLimit,

      logs,
    });
  } catch (error) {
    console.error("Get Email Logs Error:", error);

    return res.status(500).json({
      success: false,

      message: error.message || "Failed to fetch email logs",
    });
  }
};

// =====================================================
// Get Single Email Log
// =====================================================

const getEmailLogById = async (req, res) => {
  try {
    const log = await EmailLog.findOne({
      _id: req.params.id,

      userId: req.user._id,
    })
      .populate("projectId", "projectName")
      .populate("templateId", "templateName")
      .lean();

    // -------------------------------------------------
    // Log Not Found
    // -------------------------------------------------

    if (!log) {
      return res.status(404).json({
        success: false,

        message: "Email log not found",
      });
    }

    // -------------------------------------------------
    // Response
    // -------------------------------------------------

    return res.status(200).json({
      success: true,

      log,
    });
  } catch (error) {
    console.error("Get Email Log Details Error:", error);

    return res.status(500).json({
      success: false,

      message: error.message || "Failed to fetch email log",
    });
  }
};

// =====================================================
// Exports
// =====================================================

module.exports = {
  getEmailLogs,
  getEmailLogById,
};
