const variableReplacer = require("./variableReplacer");


const templateRenderer = (template,data={})=>{


    const subject =
    variableReplacer(
        template.subject,
        data
    );



    const html =
    variableReplacer(
        template.htmlContent,
        data
    );



    const css =
    template.cssContent || "";



    return {

        subject,

        html:`

<style>
${css}
</style>

${html}

`

    };


};



module.exports = templateRenderer;