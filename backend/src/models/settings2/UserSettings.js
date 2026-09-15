const mongoose = require("mongoose");

// ============================================================
// USER SETTINGS SCHEMA
// ============================================================

const userSettingsSchema = new mongoose.Schema(
  {
    // ========================================================
    // USER
    // ========================================================

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    // ========================================================
    // THEME
    // ========================================================

    theme: {
      type: String,
      enum: [
        "dark",
        "light",
        "midnight",
        "ocean",
        "forest",
      ],
      default: "dark",
    },

    // ========================================================
    // LANGUAGE
    // ========================================================

    language: {
      type: String,
      enum: [
        "en",
      ],
      default: "en",
    },
  },
  {
    timestamps: true,
  },
);

// ============================================================
// MODEL
// ============================================================

const UserSettings = mongoose.model(
  "UserSettings",
  userSettingsSchema,
);

module.exports = UserSettings;