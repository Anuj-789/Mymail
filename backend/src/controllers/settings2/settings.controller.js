const mongoose = require("mongoose");

const UserSettings = require(
  "../../models/settings2/UserSettings",
);

// ============================================================
// GET SETTINGS
// ============================================================

const getSettings = async (req, res) => {
  try {
    // --------------------------------------------------------
    // FIND USER SETTINGS
    // --------------------------------------------------------

    let settings = await UserSettings.findOne({
      userId: req.user._id,
    }).lean();

    // --------------------------------------------------------
    // CREATE DEFAULT SETTINGS IF NOT FOUND
    // --------------------------------------------------------

    if (!settings) {
      settings = await UserSettings.create({
        userId: req.user._id,
        theme: "dark",
        language: "en",
      });

      settings = settings.toObject();
    }

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error(
      "Get Settings Error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch settings",
    });
  }
};

// ============================================================
// UPDATE SETTINGS
// ============================================================

const updateSettings = async (req, res) => {
  try {
    const {
      theme,
      language,
    } = req.body;

    // --------------------------------------------------------
    // ALLOWED THEMES
    // --------------------------------------------------------

    const allowedThemes = [
      "dark",
      "light",
      "midnight",
      "ocean",
      "forest",
    ];

    // --------------------------------------------------------
    // ALLOWED LANGUAGES
    // --------------------------------------------------------

    const allowedLanguages = [
      "en",
    ];

    // --------------------------------------------------------
    // VALIDATE THEME
    // --------------------------------------------------------

    if (
      theme !== undefined &&
      !allowedThemes.includes(theme)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid theme selected",
      });
    }

    // --------------------------------------------------------
    // VALIDATE LANGUAGE
    // --------------------------------------------------------

    if (
      language !== undefined &&
      !allowedLanguages.includes(language)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid language selected",
      });
    }

    // --------------------------------------------------------
    // BUILD UPDATE
    // --------------------------------------------------------

    const updateData = {};

    if (theme !== undefined) {
      updateData.theme = theme;
    }

    if (language !== undefined) {
      updateData.language = language;
    }

    // --------------------------------------------------------
    // EMPTY UPDATE CHECK
    // --------------------------------------------------------

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No settings data provided",
      });
    }

    // --------------------------------------------------------
    // UPDATE / CREATE SETTINGS
    // --------------------------------------------------------

    const settings =
      await UserSettings.findOneAndUpdate(
        {
          userId: req.user._id,
        },
        {
          $set: updateData,
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
          runValidators: true,
        },
      ).lean();

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error(
      "Update Settings Error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update settings",
    });
  }
};

// ============================================================
// DELETE PROJECT
// ============================================================

const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // --------------------------------------------------------
    // VALIDATE PROJECT ID
    // --------------------------------------------------------

    if (
      !projectId ||
      !mongoose.Types.ObjectId.isValid(projectId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    // --------------------------------------------------------
    // PROJECT MODEL
    // --------------------------------------------------------

    const Project = require(
      "../../models/project/Project",
    );

    // --------------------------------------------------------
    // FIND USER PROJECT
    // --------------------------------------------------------

    const project = await Project.findOne({
      _id: projectId,
      userId: req.user._id,
    });

    // --------------------------------------------------------
    // PROJECT NOT FOUND
    // --------------------------------------------------------

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found or you do not have permission to delete it",
      });
    }

    // --------------------------------------------------------
    // PROJECT NAME
    // --------------------------------------------------------

    const deletedProjectName =
      project.projectName ||
      project.name ||
      "Project";

    // --------------------------------------------------------
    // DELETE PROJECT
    // --------------------------------------------------------

    await Project.deleteOne({
      _id: project._id,
      userId: req.user._id,
    });

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      projectId,
      projectName: deletedProjectName,
    });
  } catch (error) {
    console.error(
      "Delete Project Error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete project",
    });
  }
};

// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  getSettings,
  updateSettings,
  deleteProject,
};