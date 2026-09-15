const Template = require("../../models/template/Template");

const extractVariables = require("../../utils/templates/variableExtractor");

/*
    Create Custom Template
*/
/*
    Get All User Templates
    With Project Name
*/

const getMyTemplates = async (req, res) => {
  try {
    const templates = await Template.find({
      userId: req.user._id,
    })
      .populate("projectId", "projectName")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,

      count: templates.length,

      templates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const createTemplate = async (req, res) => {
  try {
    const {
      templateType,
      templateName,
      subject,
      htmlContent,
      cssContent,
      designConfig,
    } = req.body;

    const { projectId } = req.params;

    // CHECK EXISTING TEMPLATE

    const existingTemplate = await Template.findOne({
      projectId,
      userId: req.user._id,
    });

    if (existingTemplate) {
      return res.status(400).json({
        success: false,

        message: "This project already has a template",
      });
    }

    const variables = extractVariables(htmlContent);

    const template = await Template.create({
      userId: req.user._id,

      projectId,

      templateType,

      templateName,

      subject,

      htmlContent,

      cssContent,

      designConfig,

      variables,
    });

    res.status(201).json({
      success: true,

      message: "Template created successfully",

      template,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
/*
    Get All Project Templates
*/

const getProjectTemplates = async (req, res) => {
  try {
    const { projectId } = req.params;

    const templates = await Template.find({
      projectId,

      userId: req.user._id,
    });

    res.status(200).json({
      success: true,

      count: templates.length,

      templates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

/*
    Get Single Template
*/

const getSingleTemplate = async (req, res) => {
  try {
    const template = await Template.findOne({
      _id: req.params.id,

      userId: req.user._id,
    });

    if (!template) {
      return res.status(404).json({
        success: false,

        message: "Template not found",
      });
    }

    res.status(200).json({
      success: true,

      template,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

/*
    Update Template
*/
const updateTemplate = async (req, res) => {
  try {
    const template = await Template.findOne({
      _id: req.params.id,

      userId: req.user._id,
    });

    if (!template) {
      return res.status(404).json({
        success: false,

        message: "Template not found",
      });
    }

    const { subject, htmlContent, cssContent, designConfig, templateName } =
      req.body;

    if (subject) template.subject = subject;

    if (templateName) template.templateName = templateName;

    if (htmlContent !== undefined) {
      template.htmlContent = htmlContent;

      template.variables = extractVariables(htmlContent);
    }
    if (cssContent) template.cssContent = cssContent;

    if (designConfig) template.designConfig = designConfig;

    await template.save();

    res.status(200).json({
      success: true,

      message: "Template updated successfully",

      template,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

/*
    Delete Template
*/

const deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findOneAndDelete({
      _id: req.params.id,

      userId: req.user._id,
    });

    if (!template) {
      return res.status(404).json({
        success: false,

        message: "Template not found",
      });
    }

    res.status(200).json({
      success: true,

      message: "Template deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  createTemplate,

  getProjectTemplates,

  getSingleTemplate,
  
  getMyTemplates,

  updateTemplate,

  deleteTemplate,
};
