require("dotenv").config();

const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const User = require("../src/models/auth/User");



mongoose
.connect(process.env.MONGODB_URI)
.then(async()=>{


    console.log("MongoDB Connected");



    const email = process.env.ADMIN_EMAIL;



    const existingAdmin =
    await User.findOne({
        email
    });



    if(existingAdmin){

        console.log("Admin already exists");

        process.exit();

    }



    const hashedPassword =
    await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        10
    );



    const admin =
    await User.create({

        name:
        process.env.ADMIN_NAME,


        email:
        process.env.ADMIN_EMAIL,


        phone:
        process.env.ADMIN_PHONE,


        password:
        hashedPassword,


        role:"admin",


        status:"active",


        isVerified:true

    });



    console.log("Admin Created Successfully");


    console.log({

        email:admin.email,

        role:admin.role

    });



    process.exit();


})
.catch((error)=>{


    console.log(
        "Error:",
        error.message
    );


    process.exit();


});