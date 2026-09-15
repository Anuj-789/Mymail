
const Template = require("../../models/template/Template");
const EmailLog = require("../../models/email-engine/EmailLog");
const ApiKey = require("../../models/apiKey/ApiKey");
const Project = require("../../models/project/Project");

const templateRenderer = require("../../utils/email-engine/templateRenderer");
const validateEmailData = require("../../utils/email-engine/emailValidator");
const emailFormatter = require("../../utils/email-engine/emailFormatter");

const sendEmail = require("../../utils/sendEmail");

const {
    checkDailyEmailLimit,
    incrementDailyEmailCount
} = require("../../utils/usermaillimit/emailUsage.util");


// ============================================================
// DEVELOPER API EMAIL SEND
// Existing API endpoint
// ============================================================

const sendEmailController = async (req, res) => {

    let emailLog = null;

    try {

        const {
            
            to,
            data
        } = req.body;


        // ===============================
        // Daily Email Limit
        // ===============================

        const userPlan = "free";

        const emailLimit = await checkDailyEmailLimit(
            req.apiKey.userId,
            userPlan
        );

        if (!emailLimit.allowed) {

            return res.status(429).json({

                success: false,

                message: "Daily email limit exceeded.",

                limit: emailLimit.limit,

                used: emailLimit.used,

                remaining: emailLimit.remaining

            });

        }


        if (!to) {

            return res.status(400).json({

                success: false,

                message: "Receiver email required"

            });

        }


        /*
            Project ID API Key se milegi
        */

        const projectId = req.apiKey.projectId;


        // ===============================
        // Find Template
        // ===============================

       const template = await Template.findOne({
    projectId,
    userId: req.apiKey.userId
});



        if (!template) {

            return res.status(404).json({

                success: false,

                message: "Template not found"

            });

        }


        // ===============================
        // Validate Variables
        // ===============================

        const validation = validateEmailData(

            template,

            data

        );


        if (!validation.valid) {

            return res.status(400).json({

                success: false,

                message: "Missing template variables",

                missingVariables:
                    validation.missingVariables

            });

        }


        // ===============================
        // Render Template
        // ===============================

        const rendered = templateRenderer(

            template,

            data

        );


        const formatted = emailFormatter(

            rendered

        );


        // ===============================
        // Create Email Log
        // ===============================
emailLog = await EmailLog.create({

    userId: req.apiKey.userId,

    projectId,

    templateId: template._id,

    from:
        process.env.EMAIL_FROM_EMAIL,

    to,

    subject:
        formatted.subject,

    status: "pending"

});


        // ===============================
        // Send Email
        // ===============================

        const info = await sendEmail({

            email: to,

            subject: formatted.subject,

            message: formatted.html

        });


        // ===============================
        // Update Log
        // ===============================

        emailLog.status = "sent";

        emailLog.messageId =
            info.messageId || null;

        emailLog.sentAt =
            new Date();

        await emailLog.save();


        // ===============================
        // Increase Daily Count
        // ===============================

        await incrementDailyEmailCount(

            req.apiKey.userId

        );


        return res.status(200).json({

            success: true,

            message: "Email sent successfully",

            emailId:
                emailLog._id

        });

    }
    catch (error) {

        console.log(error);


        if (emailLog) {

            emailLog.status = "failed";

            emailLog.errorMessage =
                error.message;

            await emailLog.save();

        }


        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ============================================================
// DASHBOARD EMAIL SEND
// JWT AUTHENTICATED DASHBOARD
// ============================================================

const sendDashboardEmailController = async (req, res) => {

    let emailLog = null;

    try {

        const {
            projectId,
            templateId,
            to,
            data
        } = req.body;


        // ===============================
        // Basic Validation
        // ===============================

        if (!projectId || !templateId || !to) {

            return res.status(400).json({

                success: false,

                message:
                    "projectId, templateId and receiver email required"

            });

        }


        // ===============================
        // Verify Project Ownership
        // ===============================

        const project = await Project.findOne({

            _id: projectId,

            userId: req.user._id

        });


        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }


        // ===============================
        // Check Project Status
        // ===============================

        if (project.status !== "active") {

            return res.status(403).json({

                success: false,

                message: "Project is inactive"

            });

        }


        // ===============================
        // Check Production API Key
        // ===============================

        const productionKey = await ApiKey.findOne({

            projectId,

            userId: req.user._id,

            name: "production"

        });


        if (!productionKey) {

            return res.status(404).json({

                success: false,

                message:
                    "Production API key not found"

            });

        }


        // ===============================
        // Check API Key Status
        // ===============================

        if (productionKey.status !== "active") {

            return res.status(403).json({

                success: false,

                message:
                    "Production API key is inactive"

            });

        }


        // ===============================
        // Daily Email Limit
        // ===============================

        const userPlan = "free";

        const emailLimit = await checkDailyEmailLimit(

            req.user._id,

            userPlan

        );


        if (!emailLimit.allowed) {

            return res.status(429).json({

                success: false,

                message:
                    "Daily email limit exceeded.",

                limit:
                    emailLimit.limit,

                used:
                    emailLimit.used,

                remaining:
                    emailLimit.remaining

            });

        }


        // ===============================
        // Find Template
        // ===============================

        const template = await Template.findOne({

            _id: templateId,

            projectId,

            userId: req.user._id

        });


        if (!template) {

            return res.status(404).json({

                success: false,

                message:
                    "Template not found for this project"

            });

        }


        // ===============================
        // Validate Variables
        // ===============================

        const validation = validateEmailData(

            template,

            data

        );


        if (!validation.valid) {

            return res.status(400).json({

                success: false,

                message:
                    "Missing template variables",

                missingVariables:
                    validation.missingVariables

            });

        }


        // ===============================
        // Render Template
        // ===============================

        const rendered = templateRenderer(

            template,

            data

        );


        const formatted = emailFormatter(

            rendered

        );


        // ===============================
        // Create Email Log
        // ===============================

        emailLog = await EmailLog.create({

            userId:
                req.user._id,

            projectId,

            templateId,

            from:
                process.env.EMAIL_FROM_EMAIL,

            to,

            subject:
                formatted.subject,

            status:
                "pending"

        });


        // ===============================
        // Send Email
        // ===============================

        const info = await sendEmail({

            email: to,

            subject:
                formatted.subject,

            message:
                formatted.html

        });


        // ===============================
        // Update Email Log
        // ===============================

        emailLog.status =
            "sent";

        emailLog.messageId =
            info.messageId || null;

        emailLog.sentAt =
            new Date();

        await emailLog.save();


        // ===============================
        // Increase Daily Count
        // ===============================

        await incrementDailyEmailCount(

            req.user._id

        );


        // ===============================
        // Response
        // ===============================

        return res.status(200).json({

            success: true,

            message:
                "Email sent successfully",

            emailId:
                emailLog._id

        });

    }
    catch (error) {

        console.log(error);


        if (emailLog) {

            emailLog.status =
                "failed";

            emailLog.errorMessage =
                error.message;

            await emailLog.save();

        }


        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

};


module.exports = {

    sendEmailController,

    sendDashboardEmailController

};

