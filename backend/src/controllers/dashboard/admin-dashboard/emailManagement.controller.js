const EmailLog = require("../../../models/email-engine/EmailLog");

const User = require("../../../models/auth/User");

const Project = require("../../../models/project/Project");

// Get All Email Logs

const getAllEmails = async (req, res) => {
  try {
    const {
      page = 1,

      limit = 10,

      status,

      search,
    } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.to = {
        $regex: search,

        $options: "i",
      };
    }

    const skip = (page - 1) * limit;

    const emails = await EmailLog.find(query)

      .populate(
        "userId",

        "name email",
      )

      .populate(
        "projectId",

        "projectName",
      )

      .skip(skip)

      .limit(Number(limit))

      .sort({
        createdAt: -1,
      });

    const total = await EmailLog.countDocuments(query);

    return res.status(200).json({
      success: true,

      total,

      page: Number(page),

      limit: Number(limit),

      emails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Get Single Email Detail

const getEmailDetail = async (req, res) => {
  try {
    const email = await EmailLog.findById(req.params.id)

      .populate(
        "userId",

        "name email phone",
      )

      .populate(
        "projectId",

        "projectName websiteUrl",
      );

    if (!email) {
      return res.status(404).json({
        success: false,

        message: "Email log not found",
      });
    }

    return res.status(200).json({
      success: true,

      email,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Email Statistics

const getEmailStats = async (req, res) => {
  try {
    const totalEmails = await EmailLog.countDocuments();

    const sentEmails = await EmailLog.countDocuments({
      status: "sent",
    });

    const failedEmails = await EmailLog.countDocuments({
      status: "failed",
    });

    const pendingEmails = await EmailLog.countDocuments({
      status: "pending",
    });

    let successRate = 0;

    if (totalEmails > 0) {
      successRate = ((sentEmails / totalEmails) * 100).toFixed(2);
    }

    return res.status(200).json({
      success: true,

      stats: {
        totalEmails,

        sentEmails,

        failedEmails,

        pendingEmails,

        successRate: `${successRate}%`,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  getAllEmails,

  getEmailDetail,

  getEmailStats,
};
