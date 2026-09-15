const Project = require("../../../models/project/Project");

const Template = require("../../../models/template/Template");

const EmailLog = require("../../../models/email-engine/EmailLog");




// User Dashboard Overview


const getDashboardOverview = async(req,res)=>{


    try {


        const userId = req.user._id;



        // Total Projects

        const totalProjects =
        await Project.countDocuments({

            userId

        });





        // Total Templates

        const totalTemplates =
        await Template.countDocuments({

            userId

        });






        // Total Emails

        const totalEmails =
        await EmailLog.countDocuments({

            userId

        });






        // Sent Emails

        const sentEmails =
        await EmailLog.countDocuments({

            userId,

            status:"sent"

        });






        // Failed Emails

        const failedEmails =
        await EmailLog.countDocuments({

            userId,

            status:"failed"

        });







        // Success Rate


        let successRate = 0;



        if(totalEmails > 0){


            successRate =
            (
                (sentEmails / totalEmails) * 100
            )
            .toFixed(2);


        }








        // Recent Projects


        const recentProjects =
        await Project.find({

            userId

        })
        .sort({

            createdAt:-1

        })
        .limit(5)
        .select(
            "projectName status createdAt"
        );








        // Recent Emails


        const recentEmails =
        await EmailLog.find({

            userId

        })
        .sort({

            createdAt:-1

        })
        .limit(5)
        .select(
            "subject status createdAt"
        );









        return res.status(200).json({


            success:true,


            dashboard:{


                totalProjects,


                totalTemplates,


                totalEmails,


                sentEmails,


                failedEmails,


                successRate:`${successRate}%`,



                recentProjects,


                recentEmails



            }


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


    getDashboardOverview


};