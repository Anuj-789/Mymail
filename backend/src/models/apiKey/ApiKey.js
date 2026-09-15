const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema(
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

    name: {
      type: String,

      enum: ["production"],
  default: "production",
    },

    keyPrefix: {
      type: String,

      required: true,
    },

    keyHash: {
      type: String,

      required: true,
    },

    status: {
      type: String,

      enum: ["active", "inactive"],

      default: "active",
    },

    usageCount: {
      type: Number,

      default: 0,
    },

    lastUsedAt: {
      type: Date,

      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// One project can have only:
// 1 Development Key
// 1 Production Key

apiKeySchema.index(
  {
    projectId: 1,
    name: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("ApiKey", apiKeySchema);
