const jwt = require("jsonwebtoken");


// Access Token

const generateAccessToken = (userId)=>{

    return jwt.sign(

        {
            id:userId
        },

        process.env.JWT_SECRET,

        {
            expiresIn:"40m"
        }

    );

};


// Refresh Token

const generateRefreshToken = (userId)=>{

    return jwt.sign(

        {
            id:userId
        },

        process.env.JWT_REFRESH_SECRET,

        {
            expiresIn:"7d"
        }

    );

};


module.exports = {
    generateAccessToken,
    generateRefreshToken
};