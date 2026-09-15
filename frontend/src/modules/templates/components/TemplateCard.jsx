import { Eye, Edit3, Trash2, FileText } from "lucide-react";


const TemplateCard = ({
  template,
  onPreview,
  onEdit,
  onDelete
}) => {


return (

<div
className="
bg-stone-900
border
border-stone-800
rounded-2xl
p-5
flex
flex-col
justify-between
hover:border-orange-500/30
transition
"
>


<div>


<div
className="
flex
items-start
justify-between
"
>


<div
className="
h-12
w-12
rounded-xl
bg-orange-500/10
flex
items-center
justify-center
text-orange-400
"
>

<FileText size={23}/>

</div>



<span
className="
text-xs
px-3
py-1
rounded-full
bg-stone-800
text-stone-400
"
>

{template.status || "draft"}

</span>


</div>





<h3
className="
mt-5
text-white
font-semibold
text-lg
"
>

{template.templateName}

</h3>





<p
className="
mt-2
text-sm
text-stone-500
"
>

{template.templateType || "custom"}

</p>





<p
className="
mt-3
text-sm
text-orange-400
"
>

Project:

{" "}

{template.projectId?.projectName || "Unknown"}

</p>





<p
className="
mt-2
text-xs
text-stone-600
"
>

Variables:

{" "}

{template.variables?.length || 0}

</p>



</div>







<div
className="
grid
grid-cols-3
gap-2
mt-6
"
>



<button

onClick={onPreview}

className="
flex
items-center
justify-center
gap-1
py-2
rounded-xl
bg-stone-950
border
border-stone-700
text-stone-300
hover:text-white
"

>


<Eye size={15}/>


<span
className="
hidden
sm:block
"
>

View

</span>


</button>







<button

onClick={()=>onEdit(template._id)}

className="
flex
items-center
justify-center
gap-1
py-2
rounded-xl
bg-orange-500
text-black
font-semibold
"

>


<Edit3 size={15}/>


<span
className="
hidden
sm:block
"
>

Edit

</span>


</button>








<button

onClick={()=>


onDelete({

id:template._id,

projectId:template.projectId?._id

})


}

className="
flex
items-center
justify-center
gap-1
py-2
rounded-xl
bg-red-500/10
border
border-red-500/20
text-red-400
hover:bg-red-500/20
"

>


<Trash2 size={15}/>


</button>





</div>






</div>

);


};


export default TemplateCard;