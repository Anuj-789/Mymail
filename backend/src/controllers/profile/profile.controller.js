const User = require("../../models/auth/User");

const bcrypt = require("bcryptjs");




// Get User Profile

const getProfile = async(req,res)=>{

    try{


        const user = await User.findById(
            req.user._id
        ).select("-password -refreshToken");


        if(!user){

            return res.status(404).json({

                success:false,

                message:"User not found"

            });

        }



        return res.status(200).json({

            success:true,

            user

        });



    }
    catch(error){


        console.log(error);


        return res.status(500).json({

            success:false,

            message:"Server error"

        });


    }

};





// Update User Profile

const updateProfile = async(req,res)=>{

    try{


        const {
            name,
            phone,
            profileImage
        } = req.body;



        const user = await User.findById(
            req.user._id
        );


        if(!user){

            return res.status(404).json({

                success:false,

                message:"User not found"

            });

        }



        if(name){

            user.name = name;

        }


        if(phone){

            user.phone = phone;

        }


        if(profileImage){

            user.profileImage = profileImage;

        }



        await user.save();



        return res.status(200).json({

            success:true,

            message:"Profile updated successfully",

            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                profileImage:user.profileImage
            }

        });



    }
    catch(error){


        console.log(error);


        return res.status(500).json({

            success:false,

            message:"Server error"

        });


    }

};







// Change Password

const changePassword = async(req,res)=>{

    try{


        const {
            oldPassword,
            newPassword
        } = req.body;



        const user = await User.findById(
            req.user._id
        );



        if(!user){

            return res.status(404).json({

                success:false,

                message:"User not found"

            });

        }




        // Check Old Password


        const isMatch = await bcrypt.compare(

            oldPassword,

            user.password

        );



        if(!isMatch){

            return res.status(400).json({

                success:false,

                message:"Old password is incorrect"

            });

        }




        // Hash New Password


        const hashedPassword = await bcrypt.hash(

            newPassword,

            10

        );



        user.password = hashedPassword;



        // Remove Refresh Token

        user.refreshToken = null;



        await user.save();




        return res.status(200).json({

            success:true,

            message:"Password changed successfully"

        });



    }
    catch(error){


        console.log(error);


        return res.status(500).json({

            success:false,

            message:"Server error"

        });


    }

};





module.exports = {

    getProfile,

    updateProfile,

    changePassword

};