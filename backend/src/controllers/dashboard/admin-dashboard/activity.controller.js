const mongoose = require("mongoose");

const AdminActivityLog = require("../../../models/admin/AdminActivityLog");

// Get All Activities

const getActivities = async (req, res) => {
  try {
    const activities = await AdminActivityLog.find()

      .populate(
        "adminId",

        "name email",
      )

      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,

      count: activities.length,

      activities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Get Single Activity Detail

const getActivityById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,

        message: "Invalid Activity ID",
      });
    }

    const activity = await AdminActivityLog.findById(req.params.id)

      .populate(
        "adminId",

        "name email",
      );

    if (!activity) {
      return res.status(404).json({
        success: false,

        message: "Activity not found",
      });
    }

    return res.status(200).json({
      success: true,

      activity,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  getActivities,

  getActivityById,
};
