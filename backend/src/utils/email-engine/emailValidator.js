const extractVariables = (content="")=>{

    const matches =
    content.match(/{{\s*([\w.]+)\s*}}/g) || [];


    return [
        ...new Set(

            matches.map(item=>

                item
                .replace(/{{\s*|\s*}}/g,"")
                .trim()

            )

        )
    ];

};




const validateEmailData=(template,data={})=>{


    const variables=[

        ...extractVariables(template.subject),

        ...extractVariables(template.htmlContent)

    ];



    const missingVariables =
    variables.filter(variable=>

        data[variable] === undefined ||
        data[variable] === null ||
        data[variable] === ""

    );



    return {

        valid:
        missingVariables.length===0,


        missingVariables:
        [...new Set(missingVariables)]

    };


};



module.exports=validateEmailData;