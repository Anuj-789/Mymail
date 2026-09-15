const User = require("../../../models/auth/User");

const Project = require("../../../models/project/Project");

const Template = require("../../../models/template/Template");

const ApiKey = require("../../../models/apiKey/ApiKey");

const EmailLog = require("../../../models/email-engine/EmailLog");

const AdminActivityLog = require("../../../models/admin/AdminActivityLog");

// Admin Dashboard Overview

const getAdminOverview = async (req, res) => {
  try {
    // Total Users

    const totalUsers = await User.countDocuments();

    // Verified Users

    const verifiedUsers = await User.countDocuments({
      isVerified: true,
    });

    // Blocked Users

    const blockedUsers = await User.countDocuments({
      status: "blocked",
    });

    // Total Projects

    const totalProjects = await Project.countDocuments();

    // Total Templates

    const totalTemplates = await Template.countDocuments();

    // Total API Keys

    const totalApiKeys = await ApiKey.countDocuments();

    // Total Emails

    const totalEmails = await EmailLog.countDocuments();

    // Sent Emails

    const sentEmails = await EmailLog.countDocuments({
      status: "sent",
    });

    // Failed Emails

    const failedEmails = await EmailLog.countDocuments({
      status: "failed",
    });

    // Success Rate

    let successRate = 0;

    if (totalEmails > 0) {
      successRate = ((sentEmails / totalEmails) * 100).toFixed(2);
    }

    // Recent Admin Activities

    const recentActivities = await AdminActivityLog.find()

      .populate(
        "adminId",

        "name email",
      )

      .sort({
        createdAt: -1,
      })

      .limit(5);

    return res.status(200).json({
      success: true,

      dashboard: {
        totalUsers,

        verifiedUsers,

        blockedUsers,

        totalProjects,

        totalTemplates,

        totalApiKeys,

        totalEmails,

        sentEmails,

        failedEmails,

        successRate: `${successRate}%`,

        recentActivities,
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
  getAdminOverview,
};
