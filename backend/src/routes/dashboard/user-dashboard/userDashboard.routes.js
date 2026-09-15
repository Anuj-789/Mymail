const express = require("express");

const router = express.Router();



const authMiddleware = require(
    "../../../middlewares/auth/auth.middleware"
);



const {

    getDashboardOverview

} = require(
    "../../../controllers/dashboard/user-dashboard/userDashboard.controller"
);





// Dashboard Overview API


router.get(

    "/overview",

    authMiddleware,

    getDashboardOverview

);





module.exports = router;