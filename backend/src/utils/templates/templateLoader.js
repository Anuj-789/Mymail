const fs = require("fs");
const path = require("path");


// System Template Folder Path

const templatePath = path.join(
    __dirname,
    "systemTemplates"
);



const loadTemplate = (templateType) => {

    try {

        const filePath = path.join(
            templatePath,
            `${templateType}.html`
        );


        if (!fs.existsSync(filePath)) {

            throw new Error(
                "Template file not found"
            );

        }


        const html = fs.readFileSync(
            filePath,
            "utf-8"
        );


        return html;


    } catch (error) {

        throw error;

    }

};



module.exports = loadTemplate;