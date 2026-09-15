const mongoose = require("mongoose");


const adminActivityLogSchema = new mongoose.Schema(
{

    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    action:{
        type:String,
        required:true
    },


    description:{
        type:String,
        default:""
    },


    targetId:{
        type:mongoose.Schema.Types.ObjectId,
        default:null
    },


    targetType:{
        type:String,
        default:null
    },


    // Extra details about action

    details:{
        type:Object,
        default:{}
    },


    // Admin IP tracking future security ke liye

    ipAddress:{
        type:String,
        default:""
    }


},
{
    timestamps:true
});


module.exports = mongoose.model(
    "AdminActivityLog",
    adminActivityLogSchema
);