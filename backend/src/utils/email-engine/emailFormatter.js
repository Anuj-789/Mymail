const emailFormatter = ({subject,html})=>{


    return {

        subject:subject.trim(),


        html:`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

</head>


<body>

${html}

</body>


</html>

`

    };


};


module.exports=emailFormatter;