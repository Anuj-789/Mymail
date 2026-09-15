const Project = require("../../../models/project/Project");

const User = require("../../../models/auth/User");

const Template = require("../../../models/template/Template");

const EmailLog = require("../../../models/email-engine/EmailLog");

const ApiKey = require("../../../models/apiKey/ApiKey");

const AdminActivityLog = require("../../../models/admin/AdminActivityLog");

// Get All Projects

const getAllProjects = async (req, res) => {
  try {
    const {
      page = 1,

      limit = 10,

      search = "",

      status,
    } = req.query;

    const query = {};

    if (search) {
      query.projectName = {
        $regex: search,

        $options: "i",
      };
    }

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const projects = await Project.find(query)

      .populate(
        "userId",

        "name email",
      )

      .skip(skip)

      .limit(Number(limit))

      .sort({
        createdAt: -1,
      });

    const total = await Project.countDocuments(query);

    return res.status(200).json({
      success: true,

      total,

      page: Number(page),

      limit: Number(limit),

      projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Get Single Project Detail

const getProjectDetail = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findById(projectId)

      .populate(
        "userId",

        "name email phone",
      );

    if (!project) {
      return res.status(404).json({
        success: false,

        message: "Project not found",
      });
    }

    const templates = await Template.countDocuments({
      projectId,
    });

    const emails = await EmailLog.countDocuments({
      projectId,
    });

    const apiKeys = await ApiKey.find({
      projectId,
    })

      .select("-keyHash");

    return res.status(200).json({
      success: true,

      project: {
        details: project,

        stats: {
          totalTemplates: templates,

          totalEmails: emails,
        },

        apiKeys,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Update Project Status

const updateProjectStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        success: false,

        message: "Invalid status",
      });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,

        message: "Project not found",
      });
    }

    const oldStatus = project.status;

    project.status = status;

    await project.save();

    // Save Admin Activity Log

    await AdminActivityLog.create({
      adminId: req.user._id,

      action: status === "active" ? "PROJECT_ACTIVATED" : "PROJECT_DEACTIVATED",

      description: `Admin changed project status to ${status}`,

      targetId: project._id,

      targetType: "Project",

      details: {
        projectName: project.projectName,

        oldStatus,

        newStatus: status,
      },

      ipAddress: req.ip,
    });

    return res.status(200).json({
      success: true,

      message: "Project status updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  getAllProjects,

  getProjectDetail,

  updateProjectStatus,
};
