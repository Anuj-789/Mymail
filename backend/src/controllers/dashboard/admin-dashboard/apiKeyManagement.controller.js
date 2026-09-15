const ApiKey = require("../../../models/apiKey/ApiKey");

// API Key Overview

const getApiKeyOverview = async (req, res) => {
  try {
    const totalKeys = await ApiKey.countDocuments();

    const activeKeys = await ApiKey.countDocuments({
      status: "active",
    });

    const inactiveKeys = await ApiKey.countDocuments({
      status: "inactive",
    });

    const usage = await ApiKey.aggregate([
      {
        $group: {
          _id: null,

          totalUsage: {
            $sum: "$usageCount",
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,

      overview: {
        totalKeys,

        activeKeys,

        inactiveKeys,

        totalUsage: usage[0]?.totalUsage || 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Get All API Keys

const getAllApiKeys = async (req, res) => {
  try {
    const apiKeys = await ApiKey.find()

      .populate(
        "userId",

        "name email",
      )

      .populate(
        "projectId",

        "projectName",
      )

      .select("-keyHash")

      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,

      count: apiKeys.length,

      apiKeys,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  getApiKeyOverview,

  getAllApiKeys,
};
