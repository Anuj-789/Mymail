const User = require("../../../models/auth/User");

const Project = require("../../../models/project/Project");

const Template = require("../../../models/template/Template");

const ApiKey = require("../../../models/apiKey/ApiKey");

const EmailLog = require("../../../models/email-engine/EmailLog");

const AdminActivityLog = require("../../../models/admin/AdminActivityLog");

// Get All Users

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", status } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },

        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const users = await User.find(query)

      .select("-password -refreshToken")

      .skip(skip)

      .limit(Number(limit))

      .sort({
        createdAt: -1,
      });

    const total = await User.countDocuments(query);

    return res.status(200).json({
      success: true,

      total,

      page: Number(page),

      limit: Number(limit),

      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Get User Full Profile

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId)

      .select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    const projects = await Project.find({
      userId,
    });

    const templates = await Template.find({
      userId,
    });

    const apiKeys = await ApiKey.find({
      userId,
    })

      .select("-keyHash");

    const totalEmails = await EmailLog.countDocuments({
      userId,
    });

    const sentEmails = await EmailLog.countDocuments({
      userId,

      status: "sent",
    });

    const failedEmails = await EmailLog.countDocuments({
      userId,

      status: "failed",
    });

    return res.status(200).json({
      success: true,

      user: {
        profile: user,

        projects,

        templates,

        apiKeys,

        emailStats: {
          totalEmails,

          sentEmails,

          failedEmails,
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

// Block / Unblock User

const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "blocked"].includes(status)) {
      return res.status(400).json({
        success: false,

        message: "Invalid status",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    const oldStatus = user.status;

    user.status = status;

    await user.save();

    // Save Admin Activity

    await AdminActivityLog.create({
      adminId: req.user._id,

      action: status === "blocked" ? "USER_BLOCKED" : "USER_UNBLOCKED",

      description: `Admin ${status} user account`,

      targetId: user._id,

      targetType: "User",

      details: {
        userName: user.name,

        userEmail: user.email,

        oldStatus,

        newStatus: status,
      },

      ipAddress: req.ip,
    });

    return res.status(200).json({
      success: true,

      message: `User ${status} successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,

  getUserProfile,

  updateUserStatus,
};
