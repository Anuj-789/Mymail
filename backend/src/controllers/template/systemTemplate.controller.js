const path = require("path");
const fs = require("fs");

const Template = require("../../models/template/Template");

const loadTemplate = require("../../utils/templates/templateLoader");

const extractVariables = require("../../utils/templates/variableExtractor");



/*
    Get All System Templates
*/

const getSystemTemplates = async(req,res)=>{

    try{


        const templateFolder = path.join(
            __dirname,
            "../../utils/templates/systemTemplates"
        );


        const files =
        fs.readdirSync(templateFolder);



        const templates =
        files
        .filter(file=>file.endsWith(".html"))
        .map(file=>{


            const type =
            file.replace(".html","");



            return {

                templateType:type,


                templateName:
                type
                .replaceAll("-"," ")

            };


        });



        res.status(200).json({

            success:true,

            templates

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
    Get Single System Template
*/

const getSystemTemplate = async(req,res)=>{

    try{


        const {
            type
        } = req.params;



        const html =
        loadTemplate(type);



        const variables =
        extractVariables(html);



        res.status(200).json({

            success:true,


            template:{


                templateType:type,


                htmlContent:html,


                variables


            }


        });



    }
    catch(error){


        res.status(404).json({

            success:false,

            message:error.message

        });


    }

};








/*
    Clone System Template
*/

const cloneSystemTemplate = async(req,res)=>{

    try{


        const {
            projectId
        } = req.body;



        const {
            type
        } = req.params;



        const html =
        loadTemplate(type);



        const variables =
        extractVariables(html);





        const template =
        await Template.create({

            userId:req.user._id,


            projectId,



            templateType:type,



            templateName:
            type.replaceAll("-"," "),



            subject:
            `Welcome to {{appName}}`,



            htmlContent:html,



            cssContent:"",



            designConfig:{},



            variables,


            status:"draft"

        });





        res.status(201).json({

            success:true,


            message:
            "Template cloned successfully",


            template


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

    getSystemTemplates,

    getSystemTemplate,

    cloneSystemTemplate

};