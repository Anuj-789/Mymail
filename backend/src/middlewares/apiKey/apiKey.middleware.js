const crypto = require("crypto");

const ApiKey = require("../../models/apiKey/ApiKey");


const apiKeyMiddleware = async (req, res, next) => {

    try {


        // Get API Key From Header

        const apiKey = req.headers["x-api-key"];


        if (!apiKey) {

            return res.status(401).json({

                success: false,

                message: "API key required"

            });

        }



        // Hash Received API Key

        const keyHash =
            crypto
                .createHash("sha256")
                .update(apiKey)
                .digest("hex");



        // Find API Key

        const key = await ApiKey.findOne({

            keyHash

        });



        if (!key) {

            return res.status(401).json({

                success: false,

                message: "Invalid API key"

            });

        }



        // Check API Key Status

        if (key.status !== "active") {


            return res.status(403).json({

                success: false,

                message: "API key is inactive"

            });

        }



        // Update Usage Tracking

        key.usageCount += 1;

        key.lastUsedAt = new Date();


        await key.save();



        // Attach API Key Data

        req.apiKey = key;



        // Attach Project Information

        req.emailProject = {

            _id: key.projectId

        };



        next();



    } catch (error) {


        return res.status(500).json({

            success: false,

            message: error.message

        });


    }

};



module.exports = apiKeyMiddleware;