const Template = require("../../models/template/Template");

const extractVariables = require(
    "../../utils/templates/variableExtractor"
);





/*
    Get Template Variables
*/


const getTemplateVariables = async(req,res)=>{

    try{


        const {
            projectId,
            id
        } = req.params;



        const template =
        await Template.findOne({

            _id:id,

            projectId,

            userId:req.user._id

        });



        if(!template){

            return res.status(404).json({

                success:false,

                message:
                "Template not found"

            });

        }



        res.status(200).json({

            success:true,

            variables:
            template.variables

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};








/*
    Extract Variables From Editor
*/


const extractEditorVariables = async(req,res)=>{

    try{


        const {

            htmlContent

        } = req.body;



        const variables =
        extractVariables(
            htmlContent
        );



        res.status(200).json({

            success:true,

            variables

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};








/*
    Validate Template Variables
*/


const validateTemplateVariables = async(req,res)=>{

    try{


        const {

            projectId,

            id

        } = req.params;



        const {

            data

        } = req.body;




        const template =
        await Template.findOne({

            _id:id,

            projectId,

            userId:req.user._id

        });



        if(!template){

            return res.status(404).json({

                success:false,

                message:
                "Template not found"

            });

        }





        const requiredVariables =
        template.variables || [];




        const missingVariables =
        requiredVariables.filter(

            variable =>

            !data ||

            !Object.prototype.hasOwnProperty.call(

                data,

                variable

            )

        );





        if(missingVariables.length > 0){


            return res.status(400).json({

                success:false,

                message:
                "Missing required variables",

                missingVariables

            });


        }




        res.status(200).json({

            success:true,

            message:
            "All variables are valid"

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};






module.exports={


    getTemplateVariables,


    extractEditorVariables,


    validateTemplateVariables


};