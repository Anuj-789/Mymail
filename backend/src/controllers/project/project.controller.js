const Project = require("../../models/project/Project");
const Template = require("../../models/template/Template");

// Create Project
const createProject = async (req, res) => {
  try {
    const {
      projectName,
      description,
      websiteUrl,
      allowedDomains
    } = req.body;


    // Project name validation
    if (!projectName) {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }


    // Check duplicate project name for same user
    const existingProject = await Project.findOne({
      userId: req.user._id,
      projectName: projectName.trim()
    });


    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: "Project name already exists",
      });
    }


    // Create project
    const project = await Project.create({
      userId: req.user._id,
      projectName: projectName.trim(),
      description,
      websiteUrl,
      allowedDomains,
    });


    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });


  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// Get Projects Without Template

const getAvailableProjects = async(req,res)=>{


try{


const projects = await Project.find({

userId:req.user._id

});



const templates = await Template.find({

userId:req.user._id

});



const usedProjects = templates.map(

(template)=>
template.projectId.toString()

);



const availableProjects = projects.filter(

(project)=>

!usedProjects.includes(
project._id.toString()
)

);



return res.status(200).json({

success:true,

count:availableProjects.length,

projects:availableProjects

});


}
catch(error){


return res.status(500).json({

success:false,

message:error.message

});


}


};

// Get All Projects// Get All Projects// Get All Projects// Get All Projects// Get All Projects// Get All Projects// Get All Projects// Get All Projects

const getProjects = async (req, res) => {

    try {

        const projects = await Project.find({
            userId: req.user._id
        })
        .sort({
            createdAt: -1
        });


        return res.status(200).json({

            success: true,

            count: projects.length,

            projects

        });


    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// Get Single Project// Get Single Project// Get Single Project// Get Single Project// Get Single Project// Get Single Project// Get Single Project

const getProjectById = async (req, res) => {

    try {

        const project = await Project.findOne({

            _id: req.params.id,

            userId: req.user._id

        });


        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }


        return res.status(200).json({

            success: true,

            project

        });


    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// Update Project// Update Project// Update Project// Update Project// Update Project// Update Project// Update Project// Update Project

const updateProject = async (req, res) => {

    try {

        const {
            projectName,
            description,
            websiteUrl,
            allowedDomains,
            status
        } = req.body;


        const project = await Project.findOne({

            _id: req.params.id,

            userId: req.user._id

        });


        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }


        // Update fields

        if (projectName) {
            project.projectName = projectName.trim();
        }


        if (description !== undefined) {
            project.description = description;
        }


        if (websiteUrl !== undefined) {
            project.websiteUrl = websiteUrl;
        }


        if (allowedDomains !== undefined) {
            project.allowedDomains = allowedDomains;
        }


        if (status !== undefined) {
            project.status = status;
        }


        await project.save();


        return res.status(200).json({

            success: true,

            message: "Project updated successfully",

            project

        });


    } catch (error) {


        return res.status(500).json({

            success:false,

            message:error.message

        });


    }

};

// Delete Project// Delete Project// Delete Project// Delete Project// Delete Project// Delete Project// Delete Project// Delete Project// Delete Project

const deleteProject = async (req, res) => {

    try {


        const project = await Project.findOne({

            _id: req.params.id,

            userId: req.user._id

        });


        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }


        await project.deleteOne();


        return res.status(200).json({

            success: true,

            message: "Project deleted successfully"

        });


    } catch (error) {


        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
  createProject,
    getProjects,
     getAvailableProjects,
    getProjectById,
    updateProject,
    deleteProject
};