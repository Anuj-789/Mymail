const mongoose = require("mongoose");


const emailConfigSchema = new mongoose.Schema(
{

    userId:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    },


    projectId:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Project",

        required:true

    },


    fromName:{

        type:String,

        required:true,

        trim:true

    },


    fromEmail:{

        type:String,

        required:true,

        lowercase:true,

        trim:true

    },


    provider:{

        type:String,

        default:"gmail"

    },


    smtpHost:{

        type:String,

        default:process.env.EMAIL_HOST

    },


    smtpPort:{

        type:Number,

        default:process.env.EMAIL_PORT

    },


    smtpUsername:{

        type:String,

        default:process.env.EMAIL_USER

    },


    status:{

        type:String,

        enum:[
            "active",
            "inactive"
        ],

        default:"active"

    }


},
{
    timestamps:true
}
);



module.exports = mongoose.model(
    "EmailConfig",
    emailConfigSchema
);