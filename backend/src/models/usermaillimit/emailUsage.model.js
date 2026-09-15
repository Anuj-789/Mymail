const mongoose = require("mongoose");

const emailUsageSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        date: {
            type: String,
            required: true
        },

        count: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

// One record per user per day
emailUsageSchema.index(
    {
        userId: 1,
        date: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model(
    "EmailUsage",
    emailUsageSchema
);