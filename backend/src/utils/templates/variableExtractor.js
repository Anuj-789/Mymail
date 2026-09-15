const extractVariables = (content) => {

    if (!content) {
        return [];
    }


    const regex = /{{(.*?)}}/g;


    const variables = [];

    let match;


    while ((match = regex.exec(content)) !== null) {

        const variable = match[1].trim();


        if (variable && !variables.includes(variable)) {

            variables.push(variable);

        }

    }


    return variables;

};



module.exports = extractVariables;