const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      unique: true,
    },

    templateType: {
      type: String,
      required: true,
    },

    templateName: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    htmlContent: {
      type: String,
      required: true,
    },

    cssContent: {
      type: String,
      default: "",
    },

    designConfig: {
      type: Object,
      default: {},
    },

    variables: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["draft", "active"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Template", templateSchema);
