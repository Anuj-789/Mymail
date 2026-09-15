import { Monitor } from "lucide-react";

const LiveTemplatePreview = ({
  htmlContent,
  cssContent,
}) => {


  const preview = `

<!DOCTYPE html>

<html>

<head>

<meta 
name="viewport" 
content="width=device-width, initial-scale=1.0"
/>


<style>


${cssContent}



/* Preview Protection */


*{
 box-sizing:border-box;
}



html,
body{

 margin:0;

 padding:0;

 width:100%;

 min-height:100%;

 overflow-x:hidden;

 background:white;

}



body{

 display:flex;

 justify-content:center;

}



img{

 max-width:100% !important;

 height:auto !important;

}



table{

 width:100% !important;

 max-width:100% !important;

}



div,
section,
main{

 max-width:100%;

}



.email-container{

 width:100%;

 max-width:600px;

 margin:auto;

}



@media(max-width:600px){


.email-container{

 width:100%;

 padding:10px;

}


}



</style>


</head>


<body>


<div class="email-container">

${htmlContent}

</div>


</body>


</html>

`;



  return (

    <div
      className="
      bg-stone-900
      border
      border-stone-800
      rounded-2xl
      overflow-hidden
      flex
      flex-col
      h-full
      "
    >


      {/* HEADER */}


      <div
        className="
        flex
        items-center
        gap-2
        px-4
        py-3
        border-b
        border-stone-800
        shrink-0
        "
      >

        <div
          className="
          h-8
          w-8
          rounded-lg
          bg-orange-500/10
          text-orange-400
          flex
          items-center
          justify-center
          "
        >

          <Monitor size={16}/>

        </div>


        <div>

          <h3
            className="
            text-white
            text-sm
            font-semibold
            "
          >
            Live Preview
          </h3>

          <p
            className="
            text-xs
            text-stone-500
            "
          >
            Real time rendering
          </p>

        </div>


      </div>



      {/* PREVIEW AREA */}


      <div
        className="
        flex-1
        bg-stone-200
        p-3
        overflow-hidden
        flex
        justify-center
        "
      >


        <iframe

          title="live-template-preview"

          srcDoc={preview}


          className="
          bg-white
          rounded-xl
          shadow-lg
          border-0
          w-full
          h-full
          "
          
          style={{

            maxWidth:"750px",

          }}

        />


      </div>



    </div>

  );

};


export default LiveTemplatePreview;