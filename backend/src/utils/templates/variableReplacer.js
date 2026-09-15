const replaceVariables = (content,data)=>{


    if(!content){

        return "";

    }



    Object.keys(data || {}).forEach((key)=>{


        const regex =
        new RegExp(
            `{{${key}}}`,
            "g"
        );



        content =
        content.replace(
            regex,
            data[key]
        );


    });



    return content;


};



module.exports = replaceVariables;