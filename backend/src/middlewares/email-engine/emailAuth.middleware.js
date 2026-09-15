const Project = require("../../models/project/Project");


const emailAuthMiddleware = async(req,res,next)=>{


    try{


        if(!req.apiKey){

            return res.status(401).json({

                success:false,

                message:"Email authentication failed"

            });

        }



        const project =
        await Project.findById(
            req.apiKey.projectId
        );



        if(!project){

            return res.status(404).json({

                success:false,

                message:"Project not found"

            });

        }



        if(project.status !== "active"){

            return res.status(403).json({

                success:false,

                message:"Project inactive"

            });

        }



        req.emailProject = project;


        next();



    }
    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};


module.exports=emailAuthMiddleware;