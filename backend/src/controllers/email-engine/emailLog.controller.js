const EmailLog = require("../../models/email-engine/EmailLog");



const getEmailLogs = async(req,res)=>{


    try{


        const logs = await EmailLog.find({

            userId:req.user._id

        })
        .sort({

            createdAt:-1

        });



        return res.status(200).json({

            success:true,

            count:logs.length,

            logs

        });



    }
    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });


    }


};





const getSingleEmailLog = async(req,res)=>{


    try{


        const log = await EmailLog.findOne({

            _id:req.params.id,

            userId:req.user._id

        });



        if(!log){

            return res.status(404).json({

                success:false,

                message:"Email log not found"

            });

        }



        return res.status(200).json({

            success:true,

            log

        });



    }
    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });


    }


};




module.exports={

    getEmailLogs,

    getSingleEmailLog

};