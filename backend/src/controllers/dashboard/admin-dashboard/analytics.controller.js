const User = require("../../../models/auth/User");

const Project = require("../../../models/project/Project");

const EmailLog = require("../../../models/email-engine/EmailLog");

// Admin Analytics Dashboard

const getAnalytics = async (req, res) => {
  try {
    // Users

    const totalUsers = await User.countDocuments();

    const verifiedUsers = await User.countDocuments({
      isVerified: true,
    });

    const blockedUsers = await User.countDocuments({
      status: "blocked",
    });

    // Projects

    const totalProjects = await Project.countDocuments();

    const activeProjects = await Project.countDocuments({
      status: "active",
    });

    const inactiveProjects = await Project.countDocuments({
      status: "inactive",
    });

    // Emails

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

    // Success Rate

    let successRate = 0;

    if (totalEmails > 0) {
      successRate = ((sentEmails / totalEmails) * 100).toFixed(2);
    }

    return res.status(200).json({
      success: true,

      analytics: {
        users: {
          totalUsers,

          verifiedUsers,

          blockedUsers,
        },

        projects: {
          totalProjects,

          activeProjects,

          inactiveProjects,
        },

        emails: {
          totalEmails,

          sentEmails,

          failedEmails,

          pendingEmails,

          successRate: `${successRate}%`,
        },
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
  getAnalytics,
};
