const crypto = require("crypto");

const ApiKey = require("../../models/apiKey/ApiKey");
const Project = require("../../models/project/Project");

// Generate Production API Key

const generateApiKey = async (req, res) => {
  try {
    const { projectId } = req.params;

    const type = "production";

    const project = await Project.findOne({
      _id: projectId,

      userId: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,

        message: "Project not found",
      });
    }

    const existingKey = await ApiKey.findOne({
      projectId,

      name: type,
    });

    if (existingKey) {
      return res.status(400).json({
        success: false,

        message: "Production API key already exists",
      });
    }

    const randomKey = crypto.randomBytes(24).toString("hex");

    const apiKey = `pk_live_${randomKey}`;

    const keyHash = crypto.createHash("sha256").update(apiKey).digest("hex");

    await ApiKey.create({
      userId: req.user._id,

      projectId,

      name: type,

      keyPrefix: apiKey.substring(0, 12),

      keyHash,
    });

    return res.status(201).json({
      success: true,

      message: "Production API key generated successfully",

      apiKey,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Get API Keys

const getApiKeys = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({
      _id: projectId,

      userId: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,

        message: "Project not found",
      });
    }

    const apiKeys = await ApiKey.find({
      projectId,

      userId: req.user._id,
    }).select(" projectId name keyPrefix status usageCount lastUsedAt createdAt");

    return res.status(200).json({
      success: true,

      apiKeys,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Regenerate Production API Key

const regenerateApiKey = async (req, res) => {
  try {
    const { projectId } = req.params;

    const type = "production";

    const project = await Project.findOne({
      _id: projectId,

      userId: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,

        message: "Project not found",
      });
    }

    const oldKey = await ApiKey.findOne({
      projectId,

      name: type,
    });

    if (!oldKey) {
      return res.status(404).json({
        success: false,

        message: "API key not found",
      });
    }

    const randomString = crypto.randomBytes(24).toString("hex");

    const newApiKey = `pk_live_${randomString}`;

    const keyHash = crypto.createHash("sha256").update(newApiKey).digest("hex");

    oldKey.keyPrefix = newApiKey.substring(0, 12);

    oldKey.keyHash = keyHash;

    oldKey.usageCount = 0;

    oldKey.lastUsedAt = null;

    await oldKey.save();

    return res.status(200).json({
      success: true,

      message: "API key regenerated successfully",

      apiKey: newApiKey,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Change Status

const changeApiKeyStatus = async (req, res) => {
  try {
    const { projectId } = req.params;

    const { status } = req.body;

    const type = "production";

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        success: false,

        message: "Invalid status",
      });
    }

    const project = await Project.findOne({
      _id: projectId,

      userId: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,

        message: "Project not found",
      });
    }

    const apiKey = await ApiKey.findOne({
      projectId,

      name: type,
    });

    if (!apiKey) {
      return res.status(404).json({
        success: false,

        message: "API key not found",
      });
    }

    apiKey.status = status;

    await apiKey.save();

    return res.status(200).json({
      success: true,

      message: `API key ${status} successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  generateApiKey,

  getApiKeys,

  regenerateApiKey,

  changeApiKeyStatus,
};
