const express = require("express");

const router = express.Router();


const authMiddleware = require(
    "../../middlewares/auth/auth.middleware"
);



// System Template Controller

const {

    getSystemTemplates,

    getSystemTemplate,

    cloneSystemTemplate

} = require(
    "../../controllers/template/systemTemplate.controller"
);




// Custom Template Controller

const {

    createTemplate,

    getProjectTemplates,

    getSingleTemplate,

    getMyTemplates,

    updateTemplate,

    deleteTemplate

} = require(
    "../../controllers/template/customTemplate.controller"
);




// Preview Controller

const {

    previewTemplate,

    previewEditorTemplate

} = require(
    "../../controllers/template/templatePreview.controller"
);




// Variable Controller

const {

    getTemplateVariables,

    extractEditorVariables,

    validateTemplateVariables

} = require(
    "../../controllers/template/templateVariable.controller"
);



/*
==================================================
SYSTEM TEMPLATE ROUTES
==================================================
*/


// Get all system templates

router.get(
    "/system",
    authMiddleware,
    getSystemTemplates
);



// Get single system template

router.get(
    "/system/:type",
    authMiddleware,
    getSystemTemplate
);



// Clone system template

router.post(
    "/system/:type/clone",
    authMiddleware,
    cloneSystemTemplate
);





/*
==================================================
CUSTOM TEMPLATE ROUTES
==================================================
*/
router.get(
    "/my-templates",
    authMiddleware,
    getMyTemplates
);

// Create Template

router.post(
    "/projects/:projectId/templates",
    authMiddleware,
    createTemplate
);




// Get All Project Templates

router.get(
    "/projects/:projectId/templates",
    authMiddleware,
    getProjectTemplates
);




// Get Single Template

router.get(
    "/projects/:projectId/templates/:id",
    authMiddleware,
    getSingleTemplate
);




// Update Template

router.put(
    "/projects/:projectId/templates/:id",
    authMiddleware,
    updateTemplate
);




// Delete Template

router.delete(
    "/projects/:projectId/templates/:id",
    authMiddleware,
    deleteTemplate
);





/*
==================================================
PREVIEW ROUTES
==================================================
*/


// Saved Template Preview

router.post(
    "/projects/:projectId/templates/:id/preview",
    authMiddleware,
    previewTemplate
);




// Editor Live Preview

router.post(
    "/editor-preview",
    authMiddleware,
    previewEditorTemplate
);





/*
==================================================
VARIABLE ROUTES
==================================================
*/


// Get Template Variables

router.get(
    "/:id/variables",
    authMiddleware,
    getTemplateVariables
);




// Extract Variables From Editor

router.post(
    "/editor-variables",
    authMiddleware,
    extractEditorVariables
);




// Validate Variables

router.post(
    "/:id/validate",
    authMiddleware,
    validateTemplateVariables
);



module.exports = router;