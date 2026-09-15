const Template = require("../../models/template/Template");

const replaceVariables = require("../../utils/templates/variableReplacer");

/*
    Preview Existing Saved Template
*/

const previewTemplate = async (req, res) => {
  try {
    const { projectId, id } = req.params;

    const { data } = req.body;

    const template = await Template.findOne({
      _id: id,

      projectId,

      userId: req.user._id,
    });

    if (!template) {
      return res.status(404).json({
        success: false,

        message: "Template not found",
      });
    }

    let html = template.htmlContent;

    html = replaceVariables(html, data);

    const finalHtml = `

        <html>

        <head>

        <style>

        ${template.cssContent || ""}

        </style>

        </head>


        <body>

        ${html}

        </body>


        </html>

        `;

    res.status(200).json({
      success: true,

      preview: finalHtml,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

/*
    Preview Before Saving From Editor
*/

const previewEditorTemplate = async (req, res) => {
  try {
    const {
      htmlContent,

      cssContent,

      data,
    } = req.body;

    let html = htmlContent;

    html = replaceVariables(html, data);

    const finalHtml = `

        <html>

        <head>

        <style>

        ${cssContent || ""}

        </style>

        </head>


        <body>

        ${html}

        </body>


        </html>

        `;

    res.status(200).json({
      success: true,

      preview: finalHtml,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  previewTemplate,

  previewEditorTemplate,
};
