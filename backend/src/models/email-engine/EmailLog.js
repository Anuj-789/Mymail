const mongoose = require("mongoose");


const emailLogSchema = new mongoose.Schema(

{
    userId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },


    projectId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Project",

        required: true

    },


    templateId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Template",

        required: false

    },


    from: {

        type: String,

        required: true,

        trim: true

    },


    to: {

        type: String,

        required: true,

        trim: true,

        lowercase: true

    },


    subject: {

        type: String,

        required: true,

        trim: true

    },


    status: {

        type: String,

        enum: [
            "pending",
            "sent",
            "failed"
        ],

        default: "pending"

    },


    provider: {

        type: String,

        default: "gmail"

    },


    messageId: {

        type: String,

        default: null

    },


    errorMessage: {

        type: String,

        default: null

    },


    sentAt: {

        type: Date,

        default: null

    },


    metadata: {

        type: Object,

        default: {}

    }


},

{
    timestamps: true
}

);



// Performance Indexes

emailLogSchema.index({

    userId: 1,

    createdAt: -1

});


emailLogSchema.index({

    projectId: 1,

    createdAt: -1

});


emailLogSchema.index({

    status: 1

});



module.exports = mongoose.model(
    "EmailLog",
    emailLogSchema
);