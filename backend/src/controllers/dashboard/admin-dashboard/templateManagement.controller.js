const Template = require("../../../models/template/Template");

const AdminActivityLog = require("../../../models/admin/AdminActivityLog");

// Get All System Templates

const getAllTemplates = async (req, res) => {
  try {
    const {
      templateType,

      search,
    } = req.query;

    const query = {
      templateType: "system",
    };

    if (templateType) {
      query.templateType = templateType;
    }

    if (search) {
      query.templateName = {
        $regex: search,

        $options: "i",
      };
    }

    const templates = await Template.find(query)

      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,

      count: templates.length,

      templates,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Create System Template

const createTemplate = async (req, res) => {
  try {
    const {
      templateName,

      subject,

      htmlContent,

      variables,
    } = req.body;

    const template = await Template.create({
      templateName,

      templateType: "system",

      subject,

      htmlContent,

      variables,

      userId: null,

      projectId: null,
    });

    // Activity Log

    await AdminActivityLog.create({
      adminId: req.user._id,

      action: "SYSTEM_TEMPLATE_CREATED",

      description: "Admin created system template",

      targetId: template._id,

      targetType: "Template",
    });

    return res.status(201).json({
      success: true,

      message: "System template created successfully",

      template,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Update Template

const updateTemplate = async (req, res) => {
  try {
    const template = await Template.findOne({
      _id: req.params.id,

      templateType: "system",
    });

    if (!template) {
      return res.status(404).json({
        success: false,

        message: "System template not found",
      });
    }

    const updated = await Template.findByIdAndUpdate(
      req.params.id,

      req.body,

      {
        new: true,
      },
    );

    await AdminActivityLog.create({
      adminId: req.user._id,

      action: "SYSTEM_TEMPLATE_UPDATED",

      description: "Admin updated system template",

      targetId: updated._id,

      targetType: "Template",
    });

    return res.status(200).json({
      success: true,

      message: "Template updated successfully",

      template: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Delete Template

const deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findOne({
      _id: req.params.id,

      templateType: "system",
    });

    if (!template) {
      return res.status(404).json({
        success: false,

        message: "Template not found",
      });
    }

    await Template.findByIdAndDelete(req.params.id);

    await AdminActivityLog.create({
      adminId: req.user._id,

      action: "SYSTEM_TEMPLATE_DELETED",

      description: "Admin deleted system template",

      targetId: template._id,

      targetType: "Template",
    });

    return res.status(200).json({
      success: true,

      message: "Template deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  getAllTemplates,

  createTemplate,

  updateTemplate,

  deleteTemplate,
};
