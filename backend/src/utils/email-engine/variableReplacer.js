const variableReplacer = (
    content,
    data={}
)=>{


    if(!content){

        return "";

    }




    return content.replace(

        /{{\s*([\w.]+)\s*}}/g,

        (match,key)=>{


            if(
                data[key] !== undefined &&
                data[key] !== null
            ){

                return String(data[key]);

            }



            return match;


        }

    );


};



module.exports = variableReplacer;