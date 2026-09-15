const mongoose = require("mongoose");

const emailLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: false,
    },

    apiKeyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ApiKey",
      required: false,
    },

    // =========================
    // EMAIL DETAILS
    // =========================

    to: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    from: {
      type: String,
      default: null,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================
    // EMAIL PROVIDER MESSAGE ID
    // =========================

    messageId: {
      type: String,
      default: null,
      trim: true,
    },

    // =========================
    // STATUS
    // =========================

    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },

    errorMessage: {
      type: String,
      default: null,
    },

    sentAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// =========================
// INDEXES
// =========================

emailLogSchema.index({
  userId: 1,
  createdAt: -1,
});

emailLogSchema.index({
  projectId: 1,
});

emailLogSchema.index({
  status: 1,
});

emailLogSchema.index({
  messageId: 1,
});

const EmailLog = mongoose.model(
  "EmailLog",
  emailLogSchema
);

module.exports = EmailLog;