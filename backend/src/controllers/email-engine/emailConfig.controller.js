const EmailConfig = require("../../models/email-engine/EmailConfig");



// Create / Update Email Config

const saveEmailConfig = async(req,res)=>{


    try{


        const {
            projectId,
            fromName,
            fromEmail,
            provider
        } = req.body;




        let config = await EmailConfig.findOne({

            projectId,

            userId:req.user._id

        });




        if(config){


            config.fromName =
            fromName || config.fromName;


            config.fromEmail =
            fromEmail || config.fromEmail;


            config.provider =
            provider || config.provider;



            await config.save();



        }
        else{


            config = await EmailConfig.create({

                userId:req.user._id,

                projectId,

                fromName,

                fromEmail,

                provider

            });


        }





        return res.status(200).json({

            success:true,

            message:"Email configuration saved successfully",

            config

        });



    }
    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });


    }


};





// Get Email Config


const getEmailConfig = async(req,res)=>{


    try{


        const config = await EmailConfig.findOne({

            projectId:req.params.projectId,

            userId:req.user._id

        });





        if(!config){


            return res.status(404).json({

                success:false,

                message:"Email configuration not found"

            });

        }





        return res.status(200).json({

            success:true,

            config

        });




    }
    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });

    }


};





module.exports = {

    saveEmailConfig,

    getEmailConfig

};