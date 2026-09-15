const express = require("express");

const router = express.Router();



const authMiddleware =
require("../../../middlewares/auth/auth.middleware");


const adminMiddleware =
require("../../../middlewares/admin/admin.middleware");



const {


getAllTemplates,

createTemplate,

updateTemplate,

deleteTemplate


}=require(
"../../../controllers/dashboard/admin-dashboard/templateManagement.controller"
);






// Get Templates


router.get(

"/templates",

authMiddleware,

adminMiddleware,

getAllTemplates

);






// Create Template


router.post(

"/templates",

authMiddleware,

adminMiddleware,

createTemplate

);







// Update Template


router.put(

"/templates/:id",

authMiddleware,

adminMiddleware,

updateTemplate

);







// Delete Template


router.delete(

"/templates/:id",

authMiddleware,

adminMiddleware,

deleteTemplate

);





module.exports = router;